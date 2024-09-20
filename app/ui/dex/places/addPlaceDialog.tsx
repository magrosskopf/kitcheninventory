"use client";
import {
  ArrowRightIcon,
  CursorArrowRaysIcon,
  LockClosedIcon,
  PlusIcon,
  QrCodeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Divider from "../../divider";
import { useState, useEffect } from "react";
import { Item } from "@/app/lib/definitions/item.definitions";
import { getItems } from "@/app/lib/api/item.service";
import { log } from "console";
import { createPlace, createSlot } from "@/app/lib/api/place.service";
import { Slot } from "@/app/lib/definitions/slot.definitions";
import mongoose from "mongoose";

export default function AddPlaceDialog() {
  const [slots, setSlots] = useState([
    { id: 1, name: "", capacity: 1, item: "" },
  ]);
  const [items, setItems] = useState<Item[]>([]); // State to hold items for selection

  useEffect(() => {
    // Fetch items from the server to populate the item selection dropdown
    getItems("667da0d067b0fd272f7630dd").then((_items: string) => {
      setItems(JSON.parse(_items) as Item[]);
      console.log("_items", _items);
    });
  }, []);

  const addSlot = () => {
    setSlots([
      ...slots,
      { id: slots.length + 1, name: "", capacity: 1, item: "" },
    ]);
    
  };

  const removeSlot = (id: number) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  const handleSlotChange = (id: number, field: string, value: any) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot,
      ),
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const slotsData: any[] = await Promise.all(
      slots.map(
        async (slot: { name: string; capacity: number; item: string }) => {
          const tempSlot = {
            name: slot.name,
            capacity: slot.capacity,
            item: items.find((x) => x._id == slot.item)?._id || "",
          };
          return await createSlot(tempSlot);
        },
      ),
    );

    // Hier können Sie die API-Aufrufe zum Speichern des Ortes und der Slots hinzufügen
    const result = await createPlace({
      name,
      slots: slotsData,
      items: [],
      image: imageBuffer,
      userId: new mongoose.Types.ObjectId("667da0d067b0fd272f7630dd"),
    });

    const dialog = document.getElementById(
      "addPlaceDialog",
    ) as HTMLDialogElement;
    dialog?.close();
  };

  return (
    <dialog id="addPlaceDialog" className="modal">
      <div className="modal-box">
        <div className="flex flex-row justify-between mt-5">
          <h3 className="font-bold text-lg">Add Place</h3>
          <QrCodeIcon className="w-6 text-secondary" />
        </div>
        <Divider />

        <form className="w-full" onSubmit={handleSubmit}>
          <label className="form-control w-full mb-4 ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Place Name"
              className="input input-bordered w-full "
              required
            />
          </label>

          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text">Bild</span>
            </div>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input w-full"
            />
          </label>

          <Divider />

          <div className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text">Slots</span>
            </div>
            {slots.map((slot, index) => (
              <div key={slot.id} className="flex flex-col mb-2">
                <div className="flex flex-row items-center mb-2">
                  <input
                    type="text"
                    value={slot.name}
                    onChange={(e) =>
                      handleSlotChange(slot.id, "name", e.target.value)
                    }
                    placeholder={`Slot Name ${index + 1}`}
                    className="input input-bordered w-full mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={slot.capacity}
                    onChange={(e) =>
                      handleSlotChange(
                        slot.id,
                        "capacity",
                        Number(e.target.value),
                      )
                    }
                    placeholder="Capacity"
                    className="input input-bordered w-full mr-2"
                    required
                  />
                  <select
                    value={slot.item}
                    onChange={(e) =>
                      handleSlotChange(slot.id, "item", e.target.value)
                    }
                    className="select select-bordered w-full mr-2"
                    required
                  >
                    <option value="" disabled>
                      Select Item
                    </option>
                    {items.map((item: any) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={() => removeSlot(slot.id)}
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
          </div>

          <Divider />

          <div className="flex w-full flex-row justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                const dialog = document.getElementById(
                  "addPlaceDialog",
                ) as HTMLDialogElement;
                dialog?.close();
              }}
            >
              Beenden <XMarkIcon className="w-4" />
            </button>

            <button className="btn btn-primary" type="submit">
              Hinzufügen <PlusIcon className="w-4" />
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
