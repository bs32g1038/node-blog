import { create } from 'zustand';

export const LOGIN_TYPE = {
    login: 'login',
    register: 'register',
    forgotPassword: 'forgotPassword',
};

type StoreType = {
    isShowLoginModal: boolean;
    showLoginModal: (val: boolean) => void;
    tab: string;
    setTab: (val: string) => void;
};

export const useStore = create<StoreType>((set) => ({
    isShowLoginModal: false,
    tab: LOGIN_TYPE.login,
    showLoginModal: (val) => set(() => ({ isShowLoginModal: val })),
    setTab: (tab) => set(() => ({ tab })),
}));
