"use client";

import { getItems } from "@/app/lib/api/item.service";
import { deleteSlot, updateSlot } from "@/app/lib/api/place.service";
import { Item } from "@/app/lib/definitions/item.definitions";
import { Place } from "@/app/lib/definitions/place.definitions";
import { Slot } from "@/app/lib/definitions/slot.definitions";
import { PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function SlotsComponent({_slots}:{_slots: Slot[]}) {
   
    const [slots, setSlots] = useState<Slot[]>([]);
    const [items, setItems] = useState<Item[]>([]); // State to hold items for selection

    useEffect(() => {
        getItems("667da0d067b0fd272f7630dd").then((_items: Item[]) =>
            {
              setItems(_items)
              console.log("_items", _items);
              
            }
          );
        setSlots(_slots)
    }, [_slots]);
    
    const addSlot = () => {
        setSlots([...slots, { _id: slots.length + 1 + "", name: "", capacity: 1, item: "" }]);
      };
    
      const removeSlot = (id: string) => {
        const removedSlot = slots.filter(slot => slot._id !== id)
        setSlots(removedSlot);
        deleteSlot(id)
      };
    
      const handleSlotChange = (id: string, field: string, value: any) => {
        setSlots(
          slots.map(slot => (slot._id === id ? { ...slot, [field]: value } : slot))
        );
        let updatedSlot = slots.find(slot => slot._id == id)
        let newSlot = { ...updatedSlot, [field]: value }
        updateSlot(newSlot as Slot)
      };
  return (
    <>
    {slots.map((slot, index) => (
        <div key={slot._id} className="flex flex-col mb-2">
          <div className="flex flex-row items-center mb-2">
            <input
              type="text"
              value={slot.name}
              onChange={(e) => handleSlotChange(slot._id, "name", e.target.value)}
              placeholder={`Slot Name ${index + 1}`}
              className="input input-bordered w-full mr-2"
              required
            />
            <input
              type="number"
              value={slot.capacity}
              onChange={(e) => handleSlotChange(slot._id, "capacity", Number(e.target.value))}
              placeholder="Capacity"
              className="input input-bordered w-full mr-2"
              required
            />
            
            <select
              value={slot.item}
              onChange={(e) => handleSlotChange(slot._id, "item", e.target.value)}
              className="select select-bordered w-full mr-2"
              required
            >
              <option value="" disabled>Select Item</option>
              {items.map((item: any) => (
                <option key={item._id} value={item._id} selected={item._id === slot.item}>{item.name}</option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => removeSlot(slot._id)}
            >
              <XMarkIcon className="w-4" />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={addSlot}
      >
        Add Slot <PlusIcon className="w-4" />
      </button>
    </>
  );
}
