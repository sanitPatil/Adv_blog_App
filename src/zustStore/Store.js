import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const loginStore = create()(
  persist(
    (set) => ({
      loginStatus: false,
      loginUser: null,

      loginState: (data) => set(() => ({ loginStatus: true, loginUser: data })),
      logOutState: () => set(() => ({ loginStatus: false, loginUser: null })),
    }),
    {
      name: 'login-state',
    }
  )
);

const profileStore = create()(
  persist(
    (set) => ({
      profileData: null,
      setProfileData: (data) => set(() => ({ profileData: data })),
      clearProfileData: () => set(() => ({ profileData: null })),
    }),
    {
      name: 'user-profile',
    }
  )
);

const themeStore = create()(
  persist((set) => ({
    darkTheme: false,
    switchTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),
  })),
  {
    name: 'theme',
  }
);

export const useLoginStore = loginStore;
export const useProfileStore = profileStore;
export const useTheme = themeStore;
