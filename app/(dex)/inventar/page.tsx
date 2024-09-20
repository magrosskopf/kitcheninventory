"use client";

import { getCategories } from "@/app/lib/api/category.service";
import { useCategories } from "@/app/lib/definitions/category/category.store";
import { Item } from "@/app/lib/definitions/item.definitions";
import DataWrapper from "@/app/ui/datawrapper";
import AddItemBtn from "@/app/ui/dex/inventar/addItemBtn";
import AddItemDialog from "@/app/ui/dex/inventar/addItemDialog";
import EditItemDialog from "@/app/ui/dex/inventar/editItemDialog";
import FilterBar from "@/app/ui/dex/inventar/filterbar";
import ItemList from "@/app/ui/dex/inventar/itemList";
import Search from "@/app/ui/dex/inventar/search";
import Divider from "@/app/ui/divider";
import { ItemComponentSkeleton } from "@/app/ui/skeletons";
import { Suspense, useState } from "react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newItem, setNewItem] = useState(null);
  const [filters, setFilters] = useState({
    place: "",
    category: "",
    status: "",
    amount: ""
  });
  const [sorts, setSorts] = useState({
    amount: "",
  });
  

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  

  const handleNewItem = (item: Item) => {
    console.log("createdItem item");

    setNewItem(newItem)
  }
  return (
    <main className="relative h-auto">
      <h1 className={` mb-4 text-xl md:text-2xl`}>Inventar</h1>
      <Search onSearch={(query: string) => setSearchQuery(query)} />
      <FilterBar onFilterChange={handleFilterChange}  />
      <Divider />
      {/* <Suspense fallback={<ItemComponentSkeleton />} > */}
      <ItemList searchQuery={searchQuery} itemToAdd={newItem} filters={filters} />
      {/* </Suspense> */}
      <AddItemDialog addNewItemToList={setNewItem} />
      <AddItemBtn />
    </main>
  );
}
