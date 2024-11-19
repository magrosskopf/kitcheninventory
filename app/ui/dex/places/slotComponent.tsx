"use client";

import { getItems } from "@/app/lib/api/item.service";
import {
  addSlotToPlace,
  createSlot,
  deleteSlot,
  updateSlot,
} from "@/app/lib/api/place.service";
import { Item } from "@/app/lib/definitions/item.definitions";
import { Slot } from "@/app/lib/definitions/slot.definitions";
import { PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function SlotsComponent({
  _slots,
  _items,
  placeId,
}: {
  _slots: Slot[];
  _items: Item[];
  placeId: string;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItems().then((_items: string) => {
      setItems(JSON.parse(_items) as Item[]);
    });
    setSlots(_slots);
  }, [_slots]);

  const addSlot = () => {
    setSlots([...slots, { _id: "", capacity: 1, item: "" }]);
  };

  const removeSlot = (id: string) => {
    const removedSlot = slots.filter((slot) => slot._id !== id);
    setSlots(removedSlot);
    deleteSlot(id);
  };

  const handleSlotChange = (id: string, field: string, value: any) => {
    setSlots(
      slots.map((slot) =>
        slot._id === id ? { ...slot, [field]: value } : slot,
      ),
    );
    let updatedSlot = slots.find((slot) => slot._id == id);
    let newSlot = { ...updatedSlot, [field]: value };
    if (newSlot._id == "") {
      if (!newSlot.item) return;
      createSlot({
        capacity: newSlot.capacity || 0,
        item: newSlot.item || "",
      }).then((slotId) => {
        addSlotToPlace(slotId || "", placeId);
        newSlot._id = slotId
        setSlots(
          slots.map((slot) => {
            return slot._id === ""? newSlot as Slot : slot
          })
        );
        console.log(slots)
      });
    } else {
      updateSlot(newSlot as Slot);
    }
  };

  function getItemAmount(itemId: string): number {
    return _items.find((item) => item._id == itemId)?.amount || 0;
  }

  return (
    <>
    <div className={`flex flex-col mb-2`}>
      <div className="flex flex-row items-center mb-2">
        <span className="w-full">Item</span>
        <span className="w-full">Kapazität</span>
        <span className="w-full">Anzahl</span>
        <span></span>
      </div>
    </div>
      {slots.map((slot, index) => (
        <div key={slot._id} className={`flex flex-col mb-2`}>
          <div className="flex flex-row items-center mb-2">
          <select
              value={slot.item}
              onChange={(e) =>
                handleSlotChange(slot._id, "item", e.target.value)
              }
              className="select select-bordered w-full mr-2"
              required
              disabled={slot._id !== ""}
            >
              <option value="" selected disabled>
                Select Item
              </option>
              {items.map((item: any) => (
                <option
                  key={item._id}
                  value={item._id}
                  selected={item._id === slot.item}
                >
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={slot.capacity}
              onChange={(e) =>
                handleSlotChange(slot._id, "capacity", Number(e.target.value))
              }
              placeholder="Capacity"
              className="input input-bordered w-full mr-2"
              required
            />
            <div className="w-full">
              <div className="stats shadow">
                <div className="stat">
                  <div className={`stat-value  ${getItemAmount(slot.item) >= slot.capacity ? "text-orange-600" : ""}`}>{getItemAmount(slot.item)}</div>
                </div>
              </div>
            </div>

            
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
