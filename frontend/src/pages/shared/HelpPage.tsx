import React from 'react';
import { HelpCircle, BookOpen, MessageSquare, ExternalLink, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const HelpPage: React.FC = () => {
  const { language } = useAppStore();
  const isSin = language === 'si';

  const faqs = [
    {
      q: isSin ? 'මෙම AI ගුරු පද්ධතිය A/L ICT විභාගයට කෙතරම් නිවැරදිද?' : 'How accurate is this AI Tutor for the Sri Lankan A/L Exam?',
      a: isSin 
        ? 'අපගේ පද්ධතිය පිළිතුරු සපයන්නේ ජාතික අධ්‍යාපන ආයතනයේ (NIE) නිල ගුරු මාර්ගෝපදේශ සහ පසුගිය විභාග ලකුණු ලබාදීමේ ක්‍රමවේදය (Marking Schemes) පදනම් කරගත් RAG තාක්ෂණය මගින් පමණි.'
        : 'Our system strictly grounds responses in NIE Teacher Instructional Manuals and past national marking schemes using dense vector retrieval (BGE-M3).',
    },
    {
      q: isSin ? 'සිංහල සහ ඉංග්‍රීසි දෙබසින්ම ප්‍රශ්න ඇසිය හැකිද?' : 'Can I ask questions in both Sinhala and English?',
      a: isSin
        ? 'ඔව්. ඔබට සිංහලෙන් හෝ ඉංග්‍රීසියෙන් ඕනෑම ප්‍රශ්නයක් විමසිය හැකි අතර, තාක්ෂණික පද දෙබසින්ම නිරවුල්ව පැහැදිලි කරනු ලැබේ.'
        : 'Yes. The tutor is natively bilingual and provides technical terms in both languages.',
    },
    {
      q: isSin ? 'වරදින තැන් පොත (Mistake Notebook) ක්‍රියාත්මක වන්නේ කෙසේද?' : 'How does the Mistake Notebook work?',
      a: isSin
        ? 'ඔබ ප්‍රශ්නාවලියක් සිදුකරන විට වරදින ඕනෑම ප්‍රශ්නයක් ස්වයංක්‍රීයව Mistake Notebook වෙත එක්වේ. ඔබට අවශ්‍ය විටෙක "Revise Mistakes Quiz" මගින් එම වැරදුණු කරුණු පමණක් නැවත පුහුණු විය හැක.'
        : 'Every incorrect answer in quizzes is automatically logged. You can generate custom revision quizzes focusing exclusively on your weak spots.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isSin ? 'උපකාර සහ නිතර අසන ප්‍රශ්න (Help & FAQ)' : 'Help & Frequently Asked Questions'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isSin ? 'A/L ICT AI ගුරු පද්ධතිය භාවිතය පිළිබඳ මඟපෙන්වීම්.' : 'Guides and documentation for students and teachers.'}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
