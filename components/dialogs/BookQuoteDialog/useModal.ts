// hooks/useModal.ts
import { useState, useCallback } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const openModal = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return { isOpen, isVisible, openModal, closeModal };
}