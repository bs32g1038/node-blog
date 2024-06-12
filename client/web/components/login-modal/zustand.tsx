import { create } from 'zustand';

export const useStore = create<{ isShowLoginModal: boolean; showLoginModal: (val: boolean) => void }>((set) => ({
    isShowLoginModal: false,
    showLoginModal: (val) => set(() => ({ isShowLoginModal: val })),
}));
