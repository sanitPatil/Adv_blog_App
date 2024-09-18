import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
export const useLoginStore = loginStore;
