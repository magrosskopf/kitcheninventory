"use client";
import { useEffect, useState } from "react";
import ItemComponent from "./item";
import { Item } from "@/app/lib/definitions/item.definitions";
import { getItems } from "@/app/lib/api/item.service";

export default function ItemList() {
  const [shiftedItemId, setShiftedItemId] = useState(-1);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems("667da0d067b0fd272f7630dd").then((_items: Item[]) =>{
      setItems(_items)}
    );
  }, []); // Leere Abhängigkeitsliste sorgt dafür, dass der Effekt nur einmal ausgeführt wird

  const handleDeleteItem = (deletedItemId: string) => {
    // Aktualisieren der Liste der Items nach dem Löschen
    setItems(items.filter((item) => item._id !== deletedItemId));
    setShiftedItemId(-1);
  };

  const handleSwipe = (id: number) => {
    setShiftedItemId(id);
  };
  return (
    <ul>
      {items.map((item, i) => {
        return (
          <ItemComponent
            key={i}
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
