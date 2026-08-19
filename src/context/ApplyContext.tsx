"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ApplyContextValue {
  isOpen: boolean;
  openApply: () => void;
  closeApply: () => void;
}

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openApply = useCallback(() => setIsOpen(true), []);
  const closeApply = useCallback(() => setIsOpen(false), []);

  const value = useMemo<ApplyContextValue>(
    () => ({ isOpen, openApply, closeApply }),
    [isOpen, openApply, closeApply],
  );

  return (
    <ApplyContext.Provider value={value}>{children}</ApplyContext.Provider>
  );
}

export function useApply(): ApplyContextValue {
  const ctx = useContext(ApplyContext);
  if (!ctx) {
    throw new Error("useApply must be used within an ApplyProvider");
  }
  return ctx;
}
