-- ==============================================================================
-- Sinhala A/L ICT AI Tutor — Database Schema
-- Specification Reference: Section 9, Section 2.6, Section 10.4
-- Target Database: Supabase Postgres + pgvector
-- ==============================================================================

-- 1. Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- ==============================================================================
-- 2. Core Tables
-- ==============================================================================

-- Profiles (linked to Supabase auth.users)
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    role text check (role in ('student', 'teacher', 'admin')) default 'student',
    grade int,
    preferred_language text default 'si',      -- 'si' | 'en' | 'mixed'
    created_at timestamptz default now()
);

-- Units in A/L ICT Syllabus (Units 1 to 14)
create table if not exists public.units (
    id serial primary key,
    name_si text not null,
    name_en text not null,
    position int not null
);

-- Lessons within each Unit
create table if not exists public.lessons (
    id serial primary key,
    unit_id int references public.units(id) on delete cascade,
    name_si text not null,
    name_en text not null,
    position int not null
);

-- Uploaded Syllabus Materials, Notes, Teacher Guides & Past Papers
create table if not exists public.documents (
    id uuid primary key default gen_random_uuid(),
    title text,
    source_type text,                          -- 'syllabus' | 'notes' | 'past_paper' | 'teacher_guide'
    year int,
    storage_path text,
    status text default 'pending',            -- 'pending' | 'processing' | 'ready' | 'failed'
    uploaded_by uuid references public.profiles(id),
    created_at timestamptz default now()
);

-- Text Chunks with Vector Embeddings (1024-dim, e.g. BGE-M3 / multilingual-e5)
create table if not exists public.chunks (
    id uuid primary key default gen_random_uuid(),
    document_id uuid references public.documents(id) on delete cascade,
    unit_id int references public.units(id),
    lesson_id int references public.lessons(id),
    language text,                            -- 'si' | 'en' | 'mixed'
    content text not null,
    embedding vector(1024),
    quality_score float default 0,            -- from feedback credit
    created_at timestamptz default now()
);

-- Glossaries (Sinhala - English Technical Terms)
create table if not exists public.glossary (
    id serial primary key,
    term_si text,
    term_en text,
    definition_si text,
    definition_en text,
    unit_id int references public.units(id)
);

-- Question Bank (MCQ, Structured, Essay)
create table if not exists public.questions (
    id uuid primary key default gen_random_uuid(),
    type text check (type in ('mcq', 'structured', 'essay')),
    unit_id int references public.units(id),
    lesson_id int references public.lessons(id),
    difficulty text,                          -- 'easy' | 'medium' | 'hard'
    language text,                            -- 'si' | 'en' | 'mixed'
    content jsonb not null,                   -- question text, options/parts/rubric, marking scheme, model answer
    source_chunk_ids uuid[],
    status text default 'draft',              -- 'draft' | 'approved' | 'rejected'
    reviewed_by uuid references public.profiles(id),
    report_count int default 0,
    created_at timestamptz default now()
);

-- Quizzes generated for or taken by students
create table if not exists public.quizzes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id),
    scope text,                               -- 'unit' | 'multi' | 'all'
    unit_ids int[],
    settings jsonb,
    exam_mode boolean default false,
    created_at timestamptz default now()
);

-- Mapping questions included in a quiz
create table if not exists public.quiz_questions (
    quiz_id uuid references public.quizzes(id) on delete cascade,
    question_id uuid references public.questions(id),
    position int,
    primary key (quiz_id, question_id)
);

-- Student attempts and marking results
create table if not exists public.attempts (
    id uuid primary key default gen_random_uuid(),
    quiz_id uuid references public.quizzes(id),
    question_id uuid references public.questions(id),
    user_id uuid references public.profiles(id),
    answer jsonb,
    ai_marks jsonb,                           -- per-part / per-criterion suggestions
    teacher_marks jsonb,                      -- overrides
    score float,
    max_score float,
    time_taken_sec int,
    created_at timestamptz default now()
);

-- Mistake Notebook: wrong answers automatically recorded
create table if not exists public.mistakes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id),
    question_id uuid references public.questions(id),
    revised boolean default false,
    created_at timestamptz default now()
);

-- Student Mastery per Lesson (EMA Score)
create table if not exists public.mastery (
    user_id uuid references public.profiles(id),
    lesson_id int references public.lessons(id),
    score float default 0,
    updated_at timestamptz default now(),
    primary key (user_id, lesson_id)
);

-- Spaced-repetition Flashcards (SM-2)
create table if not exists public.flashcards (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id),
    glossary_id int references public.glossary(id),
    ease float default 2.5,
    interval_days int default 0,
    due_at timestamptz default now()
);

-- Prompt Version Registry for Bandit & Evaluation
create table if not exists public.prompt_versions (
    id serial primary key,
    name text not null,                       -- e.g. 'ask_v1', 'discuss_v1'
    mode text not null,                       -- 'ask' | 'discuss' | 'quiz_gen' | 'marking'
    body text not null,
    uses int default 0,
    avg_reward float default 0,
    active boolean default true
);

-- Tutor Interactions Log (Ask / Discuss)
create table if not exists public.interactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id),
    mode text,                                -- 'ask' | 'discuss'
    scope text,                               -- 'unit' | 'all'
    unit_id int,
    question text,
    chunk_ids uuid[],
    prompt_version_id int references public.prompt_versions(id),
    answer text,
    confidence float,
    latency_ms int,
    reward float,
    review_status text default 'none',        -- 'none' | 'approved' | 'edited' | 'rejected'
    corrected_answer text,
    created_at timestamptz default now()
);

-- Student & Teacher Feedback on Interactions
create table if not exists public.feedback (
    id uuid primary key default gen_random_uuid(),
    interaction_id uuid references public.interactions(id) on delete cascade,
    user_id uuid references public.profiles(id),
    rating int check (rating in (-1, 1)),
    reasons text[],
    comment text,
    created_at timestamptz default now()
);

-- Classes created by Teachers
create table if not exists public.classes (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid references public.profiles(id),
    name text not null
);

-- Class Membership
create table if not exists public.class_members (
    class_id uuid references public.classes(id) on delete cascade,
    student_id uuid references public.profiles(id) on delete cascade,
    primary key (class_id, student_id)
);

-- Teacher Quiz Assignments
create table if not exists public.assignments (
    id uuid primary key default gen_random_uuid(),
    class_id uuid references public.classes(id) on delete cascade,
    quiz_settings jsonb,
    due_at timestamptz
);

-- Preference Pairs for DPO Model Training
create table if not exists public.preference_pairs (
    id uuid primary key default gen_random_uuid(),
    question text not null,
    chosen text not null,
    rejected text not null,
    created_at timestamptz default now()
);

-- ==============================================================================
-- 3. Indexes
-- ==============================================================================

-- Vector similarity index using HNSW with Cosine distance
create index if not exists idx_chunks_embedding_hnsw 
    on public.chunks using hnsw (embedding vector_cosine_ops);

-- Metadata filtering index
create index if not exists idx_chunks_unit_lesson 
    on public.chunks (unit_id, lesson_id);

create index if not exists idx_questions_unit_lesson_status 
    on public.questions (unit_id, lesson_id, type, status);

create index if not exists idx_attempts_user_quiz 
    on public.attempts (user_id, quiz_id);

create index if not exists idx_interactions_user_created 
    on public.interactions (user_id, created_at desc);

create index if not exists idx_flashcards_user_due 
    on public.flashcards (user_id, due_at);

-- ==============================================================================
-- 4. Auth & Profiles Automation (Trigger)
-- ==============================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, role, grade, preferred_language)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', ''),
        coalesce(new.raw_user_meta_data->>'role', 'student'),
        (new.raw_user_meta_data->>'grade')::int,
        coalesce(new.raw_user_meta_data->>'preferred_language', 'si')
    )
    on conflict (id) do update set
        full_name = excluded.full_name,
        preferred_language = excluded.preferred_language;
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ==============================================================================
-- 5. Stored Procedures: Vector Similarity Search
-- ==============================================================================

create or replace function public.match_chunks (
    query_embedding vector(1024),
    filter_unit_id int default null,
    filter_lesson_id int default null,
    match_count int default 20
)
returns table (
    id uuid,
    document_id uuid,
    unit_id int,
    lesson_id int,
    language text,
    content text,
    quality_score float,
    similarity float
)
language sql stable as $$
    select
        c.id,
        c.document_id,
        c.unit_id,
        c.lesson_id,
        c.language,
        c.content,
        c.quality_score,
        1 - (c.embedding <=> query_embedding) as similarity
    from public.chunks c
    where (filter_unit_id is null or c.unit_id = filter_unit_id)
      and (filter_lesson_id is null or c.lesson_id = filter_lesson_id)
    order by c.embedding <=> query_embedding
    limit match_count;
$$;

-- ==============================================================================
-- 6. Row Level Security (RLS)
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.documents enable row level security;
alter table public.chunks enable row level security;
alter table public.glossary enable row level security;
alter table public.questions enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.attempts enable row level security;
alter table public.mistakes enable row level security;
alter table public.mastery enable row level security;
alter table public.flashcards enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.interactions enable row level security;
alter table public.feedback enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.assignments enable row level security;
alter table public.preference_pairs enable row level security;

-- Profiles: Anyone authenticated can read profiles; users can update their own
create policy "profiles_select" on public.profiles
    for select using (auth.role() = 'authenticated');

create policy "profiles_update_own" on public.profiles
    for update using (auth.uid() = id);

-- Units, Lessons, Glossary: Read access for all authenticated users
create policy "units_read" on public.units
    for select using (true);

create policy "lessons_read" on public.lessons
    for select using (true);

create policy "glossary_read" on public.glossary
    for select using (true);

-- Chunks: Read access for all authenticated users
create policy "chunks_read" on public.chunks
    for select using (auth.role() = 'authenticated');

-- Questions: Students see approved questions; Teachers/Admins see all
create policy "questions_select" on public.questions
    for select using (
        status = 'approved'
        or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('teacher', 'admin')
        )
    );

create policy "questions_teacher_manage" on public.questions
    for all using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('teacher', 'admin')
        )
    );

-- Quizzes & Quiz Questions: Users access their own quizzes
create policy "quizzes_user_policy" on public.quizzes
    for all using (user_id = auth.uid());

create policy "quiz_questions_policy" on public.quiz_questions
    for select using (
        exists (
            select 1 from public.quizzes q
            where q.id = quiz_questions.quiz_id and q.user_id = auth.uid()
        )
    );

-- Attempts: Students manage own; Teachers view their classes' attempts
create policy "student_own_attempts" on public.attempts
    for all using (user_id = auth.uid());

create policy "teacher_class_attempts" on public.attempts
    for select using (
        exists (
            select 1 from public.class_members cm
            join public.classes c on c.id = cm.class_id
            where cm.student_id = attempts.user_id
              and c.teacher_id = auth.uid()
        )
    );

-- Mistakes: User-owned
create policy "student_own_mistakes" on public.mistakes
    for all using (user_id = auth.uid());

-- Mastery: Student-owned & Class-visible
create policy "student_own_mastery" on public.mastery
    for all using (user_id = auth.uid());

create policy "teacher_class_mastery" on public.mastery
    for select using (
        exists (
            select 1 from public.class_members cm
            join public.classes c on c.id = cm.class_id
            where cm.student_id = mastery.user_id
              and c.teacher_id = auth.uid()
        )
    );

-- Flashcards: User-owned
create policy "student_own_flashcards" on public.flashcards
    for all using (user_id = auth.uid());

-- Interactions: User-owned & Teacher review
create policy "student_own_interactions" on public.interactions
    for all using (user_id = auth.uid());

create policy "teacher_review_interactions" on public.interactions
    for select using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('teacher', 'admin')
        )
    );

-- Feedback: User-owned & Teacher/Admin readable
create policy "user_own_feedback" on public.feedback
    for insert with check (user_id = auth.uid());

create policy "feedback_read" on public.feedback
    for select using (
        user_id = auth.uid()
        or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('teacher', 'admin')
        )
    );

-- Classes & Members
create policy "teacher_classes_manage" on public.classes
    for all using (teacher_id = auth.uid());

create policy "student_classes_view" on public.classes
    for select using (
        exists (
            select 1 from public.class_members cm
            where cm.class_id = classes.id and cm.student_id = auth.uid()
        )
    );

create policy "class_members_policy" on public.class_members
    for all using (
        student_id = auth.uid()
        or exists (
            select 1 from public.classes c
            where c.id = class_members.class_id and c.teacher_id = auth.uid()
        )
    );

-- Assignments: Teacher manages, student reads
create policy "assignments_teacher" on public.assignments
    for all using (
        exists (
            select 1 from public.classes c
            where c.id = assignments.class_id and c.teacher_id = auth.uid()
        )
    );

create policy "assignments_student_read" on public.assignments
    for select using (
        exists (
            select 1 from public.class_members cm
            where cm.class_id = assignments.class_id and cm.student_id = auth.uid()
        )
    );

-- Prompt Versions: Readable by all, manageable by Admin
create policy "prompt_versions_read" on public.prompt_versions
    for select using (auth.role() = 'authenticated');

create policy "prompt_versions_admin" on public.prompt_versions
    for all using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
        )
    );

-- ==============================================================================
-- 7. Seed Initial Syllabus Units (Grade 12–13 A/L ICT Syllabus)
-- ==============================================================================

insert into public.units (id, position, name_si, name_en) values
(1, 1, 'තොරතුරු සහ සන්නිවේදන තාක්ෂණය හැඳින්වීම', 'Introduction to Information and Communication Technology'),
(2, 2, 'පරිගණකයක ගෘහ නිර්මාණ ශිල්පය', 'Architecture of the Computer'),
(3, 3, 'පරිගණකයේ දත්ත නිරූපණය', 'Data Representation in Computers'),
(4, 4, 'මූලික ඩිජිටල් තාර්කික පරිපථ', 'Fundamental Digital Logic Circuits'),
(5, 5, 'මෙහෙයුම් පද්ධති', 'Operating Systems'),
(6, 6, 'දත්ත සන්නිවේදනය සහ පරිගණක ජාල', 'Data Communication and Computer Networking'),
(7, 7, 'දත්ත සමුදාය කළමනාකරණ පද්ධති', 'Database Management Systems'),
(8, 8, 'පද්ධති විශ්ලේෂණය සහ නිර්මාණය', 'System Analysis and Design'),
(9, 9, 'පරිගණක ක්‍රමලේඛනය (Python)', 'Computer Programming (Python)'),
(10, 10, 'වෙබ් අඩවි නිර්මාණය (HTML, CSS, JS, PHP)', 'Web Development'),
(11, 11, 'ඉන්ටර්නෙට් ඔෆ් තිංග්ස් (IoT)', 'Internet of Things (IoT)'),
(12, 12, 'ව්‍යාපාර ක්ෂේත්‍රයේ ICT', 'ICT in Business'),
(13, 13, 'ICT නව ප්‍රවණතා සහ අනාගත දිශානති', 'New Trends and Future Directions in ICT'),
(14, 14, 'ICT ව්‍යාපෘතිය', 'ICT Project')
on conflict (id) do nothing;

-- Set sequence for units to next available id
select setval('public.units_id_seq', (select max(id) from public.units));

-- ==============================================================================
-- 8. Seed Initial Prompt Versions (from Section 10.4)
-- ==============================================================================

insert into public.prompt_versions (id, name, mode, body, active) values
(1, 'ask_v1', 'ask', 'You are an A/L ICT tutor for Sri Lankan students. Answer ONLY using the CONTEXT passages. If the context does not contain the answer, say clearly that it is not covered in the syllabus material and suggest which unit to check. Reply in the student''s language ({language}); keep technical terms in English where textbooks do. Be concise and exam-oriented. Cite sources as [Unit X – Lesson Y].', true),
(2, 'discuss_v1', 'discuss', 'You are teaching an A/L ICT concept step by step using ONLY the CONTEXT. Explain one idea at a time with a simple example, then ask one short check question. If the student is stuck, give a hint before the answer. Adapt to their replies. At the end, summarise and offer a quick quiz. Reply in {language}; cite sources.', true),
(3, 'quiz_gen_v1', 'quiz_gen', 'Create {n} {type} questions for A/L ICT from the CONTEXT only. Return ONLY valid JSON matching this schema: {schema}. Ensure exactly one correct MCQ answer, marks add up, and every structured/essay question includes a marking scheme or rubric and a model answer.', true),
(4, 'marking_v1', 'marking', 'Mark the student''s answer strictly against the provided marking points/rubric. Return JSON: marks per point/criterion, short feedback per item, and total. Do not award marks for points not in the scheme.', true)
on conflict (id) do nothing;

select setval('public.prompt_versions_id_seq', (select max(id) from public.prompt_versions));
