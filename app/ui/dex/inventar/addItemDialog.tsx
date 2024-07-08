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
import { createItem } from "@/app/lib/api/item.service";
import { useFormState, useFormStatus } from "react-dom";
import { Place } from "@/app/lib/definitions/place.definitions";
import { Category } from "@/app/lib/definitions/category.definitions";
import mongoose from "mongoose";

export default function AddItemDialog() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createItem, initialState);

  const places: Place[] = [
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Kühlschrank",
      userId: "667da0d067b0fd272f7630dd",
    },
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Schrank oben rechts",
      userId: "667da0d067b0fd272f7630dd",
    },
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Obstschale",
      userId: "667da0d067b0fd272f7630dd",
    },
  ];
  const categories: Category[] = [
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Obst",
    },
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Milch",
    },
  ];
  return (
    <dialog id="addItemDialog" className="modal">
      <div className="modal-box">
        <div className="flex flex-row justify-between mt-5">
          <h3 className="font-bold text-lg">Add Product</h3>
          <QrCodeIcon className="w-6 text-secondary" />
        </div>
        <Divider />

        <form action={dispatch}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Banana"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Menge</span>
            </div>
            <input
              type="number"
              name="amount"
              placeholder="0"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Ort</span>
            </div>
            <select
              className="select select-bordered"
              name="place"
              defaultValue=""
            >
              <option disabled>Pick one</option>
              {places.map((place: Place) => {
                return (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Kategorie</span>
            </div>
            <select
              className="select select-bordered"
              name="category"
              defaultValue=""
            >
              <option disabled>Pick one</option>
              {categories.map((category: Category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </label>

          <Divider />

          {/* if there is a button in form, it will close the modal */}
          <div className="flex w-full flex-row  justify-between">
            <button
              className="btn  btn-secondary"
              onClick={() => document.getElementById("addItemDialog")?.close()}
            >
              Beenden <XMarkIcon className="w-4" />
            </button>

            <button
              className="btn  btn-primary"
              type="submit"
              onClick={() => document.getElementById("addItemDialog")?.close()}
            >
              Hinzufügen <PlusIcon className="w-4" />
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
