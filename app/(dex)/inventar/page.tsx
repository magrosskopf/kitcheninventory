import { getItems } from "@/app/lib/api/item.service";
import { ListItem } from "@/app/lib/definitions/item.definitions";
import AddItemBtn from "@/app/ui/dex/inventar/addItemBtn";
import AddItemDialog from "@/app/ui/dex/inventar/addItemDialog";
import FilterBar from "@/app/ui/dex/inventar/filterbar";
import ItemList from "@/app/ui/dex/inventar/itemList";
import Search from "@/app/ui/dex/inventar/search";
import Divider from "@/app/ui/divider";
import { ItemComponentSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="relative h-auto">
      <h1 className={` mb-4 text-xl md:text-2xl`}>Inventar</h1>
      <Search />
      <FilterBar />
      <Divider />
      {/* <Suspense fallback={<ItemComponentSkeleton />} > */}
      <ItemList />
      {/* </Suspense> */}
      <AddItemDialog />
      <AddItemBtn />
    </main>
  );
}
