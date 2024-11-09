"use client";
import { useEffect, useState } from "react";
import ItemComponent from "./item";
import { Item } from "@/app/lib/definitions/item.definitions";
import { getItems } from "@/app/lib/api/item.service";
import { Place } from "@/app/lib/definitions/place.definitions";
import { useCategories } from "@/app/lib/definitions/category/category.store";
import { getCategories } from "@/app/lib/api/category.service";
import { Category } from "@/app/lib/definitions/category/category.definitions";

export default function ItemList({ searchQuery, itemToAdd, filters }:{searchQuery: string, itemToAdd: Item | null, filters: any}) {
  const [shiftedItemId, setShiftedItemId] = useState(-1);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setCategories = useCategories((state:any) => state.setCategories)
  useEffect(() => {
    getItems().then((_items: string) => {
      const parsedItems = JSON.parse(_items) as Item[];
      setItems(parsedItems);
      setFilteredItems(parsedItems);
    }).catch((err) => {
      console.error("Failed to fetch items:", err);
      setError("Failed to load items.");
    })
    .finally(() => {
      setLoading(false);
    });
    
    getCategories().then((_categories: string) => {
        setCategories(JSON.parse(_categories))
    })
    
  }, []); // Leere Abhängigkeitsliste sorgt dafür, dass der Effekt nur einmal ausgeführt wird

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        filterAllProperties(searchQuery, filters)
      );
    }
  }, [searchQuery, items]);

  useEffect(() => {
    if (itemToAdd) {
      setItems([...items, itemToAdd])
    }
  }, [itemToAdd])

  useEffect(() => {
    setFilteredItems(
      filterAllProperties(searchQuery, filters)
    );
  }, [filters])

  const filterAllProperties = (searchQuery: string, filters: any) => {
    let searchedAndFilteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter(item =>  {
      if(!filters.place) return true
      else return item.place?._id === filters.place? true: false
    }).filter(item => 
      item.category?.find(x=> x._id === filters.category) || filters.category === ""? true: false
    )

    if (isSortingEnabled()) searchedAndFilteredItems.sort((a, b) => {
      if( a.amount < b.amount) return -1
      else if (a.amount > b.amount) return 1
      return 0
    })
    if (isDescending()) searchedAndFilteredItems.reverse()
    return searchedAndFilteredItems

    function isSortingEnabled() { return filters.amount !== "" }
    function isDescending() { return filters.amount === "desc" }
  }

  const handleDeleteItem = (deletedItemId: string) => {
    // Aktualisieren der Liste der Items nach dem Löschen
    setItems(items.filter((item) => item._id !== deletedItemId));
    setFilteredItems(items.filter((item) => item._id !== deletedItemId));
    setShiftedItemId(-1);
  };

  const handleSwipe = (id: number) => {
    setShiftedItemId(id);
  };

  return (
    <ul>
      {filteredItems.map((item, i) => {
        return (
          <ItemComponent
            key={item._id}
            id={i}
            isShifted={shiftedItemId === i}
            data={item}
            onSwipe={handleSwipe}
            onDelete={handleDeleteItem}
          />
        );
      })}
    </ul>
  );
}
