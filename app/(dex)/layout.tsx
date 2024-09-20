"use client";
import BottomNav from "@/app/ui/dex/bottomnav";
import AddItemBtn from "../ui/dex/inventar/addItemBtn";
import { getCategories } from "../lib/api/category.service";
import { useCategories } from "../lib/definitions/category/category.store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const setCategories = useCategories((state:any) => state.setCategories)
  getCategories().then((_categories: string) => {
    setCategories(JSON.parse(_categories))
  })
  return (
    <div className="flex h-full w-full flex-col md:overflow-hidden ">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      <BottomNav />
    </div>
  );
}
