import { create } from 'zustand';
import type { UserRole, AppLanguage, UserProfile } from '../types';

interface AppState {
  role: UserRole;
  language: AppLanguage;
  user: UserProfile | null;
  isAuthenticated: boolean;
  selectedUnitId: number | null;
  sidebarCollapsed: boolean;
  
  // Actions
  setRole: (role: UserRole) => void;
  setLanguage: (lang: AppLanguage) => void;
  setUser: (user: UserProfile | null) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  setSelectedUnitId: (unitId: number | null) => void;
  toggleSidebar: () => void;
}

const mockStudents: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr_stu_01',
    name: 'කසුන් පෙරේරා (Kasun Perera)',
    email: 'kasun@alict.lk',
    role: 'student',
    grade: 'Grade 13 (2026 A/L)',
    school: 'ආනන්ද විද්‍යාලය - කොළඹ',
    avatar: '/images/avatar_default.jpg',
    language: 'si',
    targetYear: 2026,
    streakDays: 12,
  },
  teacher: {
    id: 'usr_tch_01',
    name: 'ඩී. විජේසිංහ ගුරුතුමා (Mr. Wijesinghe)',
    email: 'teacher@alict.lk',
    role: 'teacher',
    school: 'කොළඹ රාජකීය විද්‍යාලය',
    avatar: '/images/avatar_default.jpg',
    language: 'si',
  },
  admin: {
    id: 'usr_adm_01',
    name: 'පද්ධති පරිපාලක (System Administrator)',
    email: 'admin@alict.lk',
    role: 'admin',
    avatar: '/images/avatar_default.jpg',
    language: 'en',
  },
};

export const useAppStore = create<AppState>((set, get) => {
  // Sync document element data-theme on initial load
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'student');
  }

  return {
    role: 'student',
    language: 'si',
    user: mockStudents.student,
    isAuthenticated: true,
    selectedUnitId: 4, // Unit 4 Database default
    sidebarCollapsed: false,

    setRole: (role: UserRole) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', role);
      }
      set({ 
        role, 
        user: mockStudents[role] 
      });
    },

    setLanguage: (language: AppLanguage) => {
      set({ language });
    },

    setUser: (user: UserProfile | null) => {
      set({ user, isAuthenticated: !!user });
    },

    login: (email: string, role: UserRole = 'student') => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', role);
      }
      set({
        role,
        isAuthenticated: true,
        user: {
          ...mockStudents[role],
          email,
        },
      });
    },

    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
      });
    },

    setSelectedUnitId: (selectedUnitId: number | null) => {
      set({ selectedUnitId });
    },

    toggleSidebar: () => {
      set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
    },
  };
});
