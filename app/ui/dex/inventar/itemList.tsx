"use client";
import { useEffect, useState } from "react";
import ItemComponent from "./item";
import { Item } from "@/app/lib/definitions/item.definitions";
import { getItems } from "@/app/lib/api/item.service";
import { Place } from "@/app/lib/definitions/place.definitions";

export default function ItemList({ searchQuery, itemToAdd, filters }:{searchQuery: string, itemToAdd: Item | null, filters: any}) {
  const [shiftedItemId, setShiftedItemId] = useState(-1);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getItems("667da0d067b0fd272f7630dd").then((_items: string) => {
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
    console.log("itemToAdd", itemToAdd);
    
    if (itemToAdd) {
      
      setItems([...items, itemToAdd])
    }
  }, [itemToAdd])

  useEffect(() => {
    setFilteredItems
  }, [filters])

  const filterAllProperties = (searchquery: string, filters: any) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).filter(item =>  {
      console.log(filters.place);
      
      if(!filters.place) return true
      else return item.place?._id === filters.place? true: false
    })

    /*

.filter(item => 
      item.category?.find(x=> x._id === filters.category._id) && filters.category._id? true: false
    )

 &&
      item.category?.find(x=> x._id === filters.category._id) &&
      item.place?.find(x=> x._id === filters.place._id)
    */
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

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
