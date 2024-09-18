import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'zustand/middleware/immer';

const loginStore = create()(
  persist(
    (set) => ({
      loginStatus: false,
      loginUser: null,
      loginState: (loginUserData) =>
        set(produce(() => ({ loginStatus: true, loginUser: loginUserData }))),
      logOutState: () =>
        set(produce(() => ({ loginStatus: false, loginUser: null }))),
    }),
    {
      name: 'login-state',
    }
  )
);
export const useLoginStore = loginStore;
