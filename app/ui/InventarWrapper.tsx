"use client"
import { ReactNode, Suspense } from "react";
import AddItemBtn from "./dex/inventar/addItemBtn";
import AddItemDialog from "./dex/inventar/addItemDialog";
import FilterBar from "./dex/inventar/filterbar";
import ItemList from "./dex/inventar/itemList";
import Search from "./dex/inventar/search";
import Divider from "./divider";
import { getCategories } from "@/app/lib/api/category.service";
import { useCategories } from "@/app/lib/definitions/category/category.store";
import { Item } from "@/app/lib/definitions/item.definitions";
import EditItemDialog from "@/app/ui/dex/inventar/editItemDialog";
import { ItemComponentSkeleton } from "@/app/ui/skeletons";
import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";

export default function InventarWrapper() {
    const [searchQuery, setSearchQuery] = useState("");
    const [newItem, setNewItem] = useState(null);
    const [filters, setFilters] = useState({
      place: "",
      category: "",
      status: "",
      amount: ""
    });
    
  
    const handleFilterChange = (filterName: string, value: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: value,
      }));
    };
 
    return (
    <main className="relative h-auto">
      <h1 className={` mb-4 text-xl md:text-2xl`}>Inventar</h1>
      <Search onSearch={(query: string) => setSearchQuery(query)} />
      <FilterBar onFilterChange={handleFilterChange}  />
      <Divider />
      <Suspense fallback={<ItemComponentSkeleton />} > 
          <ItemList searchQuery={searchQuery} itemToAdd={newItem} filters={filters} />
      </Suspense>
      <EditItemDialog />
      <SessionProvider>
      <AddItemDialog addNewItemToList={setNewItem} />
      </SessionProvider>
      <AddItemBtn />
    </main>
    )
}