import {create} from 'zustand';

interface State {
  showLoading: boolean;
  openLoading: () => void;
  closeLoading: () => void;
}

export const useLoadingModalStore = create<State>(set => ({
  showLoading: false,
  openLoading: () => set({showLoading: true}),
  closeLoading: () => set({showLoading: false}),
}));
