import { create } from "zustand";
import { Category } from "./category.definitions";

export const useCategories = create((set) => ({
    categories: [] as Category[],
    setCategories: (_categories: Category[]) => set((state: any) => ({ categories: _categories })),
  }))