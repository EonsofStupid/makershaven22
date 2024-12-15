import { atom } from 'jotai';

export interface ModalState {
  activeModal: string | null;
  modalData: any;
}

export const modalStateAtom = atom<ModalState>({
  activeModal: null,
  modalData: null
});

export const useModalState = () => {
  const [modalState, setModalState] = atom(modalStateAtom);

  return {
    ...modalState,
    openModal: (modalId: string, data?: any) => 
      setModalState({ activeModal: modalId, modalData: data }),
    closeModal: () => 
      setModalState({ activeModal: null, modalData: null }),
    setModalData: (data: any) =>
      setModalState(prev => ({ ...prev, modalData: data }))
  };
};