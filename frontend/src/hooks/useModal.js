import { useState } from 'react';
// Bu hook, bu üç şeyi  ---> durum, açma fonksiyonu, kapatma fonksiyonu döndürür
//===============================================================

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};