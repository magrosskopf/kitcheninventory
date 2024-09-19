import BottomNav from "@/app/ui/dex/bottomnav";
import AddItemBtn from "../ui/dex/inventar/addItemBtn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col md:overflow-hidden ">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      <BottomNav />
    </div>
  );
}
