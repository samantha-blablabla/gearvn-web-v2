"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CategoryMenuContextValue {
  menuOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const CategoryMenuContext = createContext<CategoryMenuContextValue>({
  menuOpen: false,
  toggle: () => {},
  close: () => {},
});

export function CategoryMenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <CategoryMenuContext.Provider
      value={{
        menuOpen,
        toggle: () => setMenuOpen((p) => !p),
        close: () => setMenuOpen(false),
      }}
    >
      {children}

      {/* Backdrop — bắt đầu từ dưới navbar (80px), KHÔNG phủ navbar */}
      <div
        className={cn(
          "fixed left-0 right-0 bottom-0 z-40 bg-black/50",
          "transition-opacity duration-200",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ top: "80px" }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </CategoryMenuContext.Provider>
  );
}

export function useCategoryMenu() {
  return useContext(CategoryMenuContext);
}
