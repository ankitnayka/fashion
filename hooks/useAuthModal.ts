import { create } from "zustand";

type AuthModalStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
