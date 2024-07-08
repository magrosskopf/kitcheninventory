import Link from "next/link";
import NavLinks from "./navlinks";

export default function BottomNav() {
  return (
    <div className="flex w-full flex-col fixed bottom-0">
      <div className="flex grow flex-row justify-between py-2 px-5  bg-base-200 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
