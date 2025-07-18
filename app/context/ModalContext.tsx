import React, { createContext, ReactNode, useContext, useState } from "react";

// 🧠 Context type definition
type ModalContextType = {
  modals: Record<string, boolean>; // store modal states as { modalId: isOpen }
  open: (id: string) => void; // open modal by ID
  close: (id: string) => void; // close modal by ID
  isOpen: (id: string) => boolean; // check if specific modal is open
};

// 🛠️ Create context with initial null value
const ModalContext = createContext<ModalContextType | null>(null);

// 📦 Provider that wraps around the app or modal area
export function ModalProvider({ children }: { children: ReactNode }) {
  // 🔄 All modal states stored in a map
  const [modals, setModals] = useState<Record<string, boolean>>({});

  // 🟢 Open a modal by ID
  const open = (id: string) => {
    setModals((prev) => ({ ...prev, [id]: true }));
  };

  // 🔴 Close a modal by ID
  const close = (id: string) => {
    setModals((prev) => ({ ...prev, [id]: false }));
  };

  // ❓ Check if a modal is open
  const isOpen = (id: string) => {
    return modals[id] ?? false; // default to false if modal ID is not in map
  };

  return (
    <ModalContext.Provider value={{ modals, open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

// 🔌 Hook to access modal context
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be within a ModalProvider");
  return context;
}
