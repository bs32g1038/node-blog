import { create } from 'zustand';

export const useStore = create<{ refreshCommentListTag: number; updateCommentListTag: () => void }>((set) => ({
    refreshCommentListTag: 0,
    updateCommentListTag: () =>
        set((state: { refreshCommentListTag: number }) => ({ refreshCommentListTag: state.refreshCommentListTag + 1 })),
}));
