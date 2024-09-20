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
import { Place } from "@/app/lib/definitions/place.definitions";
import { Category } from "@/app/lib/definitions/category/category.definitions";
import { getPlaces } from "@/app/lib/api/place.service";
import { useState, useEffect } from "react";
import { useCategories } from "@/app/lib/definitions/category/category.store";
import { getCategories } from "@/app/lib/api/category.service";

export default function EditItemDialog() {
  const [places, setPlaces] = useState<Place[]>();
  const categories: Category[] = useCategories((state:any) => state.categories)
  const setCategories = useCategories((state:any) => state.setCategories)
  useEffect(() => {
    getPlaces("667da0d067b0fd272f7630dd").then((places) => {
      let _places = JSON.parse(places) as Place[];
      setPlaces(_places);
    });
    
    
  }, []);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    createItem(formData);
  };

  
  return (
    <dialog id="editItemDialog" className="modal">
      <div className="modal-box">
        <div className="flex flex-row justify-between mt-5">
          <h3 className="font-bold text-lg">Edit Product</h3>
          <QrCodeIcon className="w-6 text-secondary" />
        </div>
        <Divider />

        <form onSubmit={handleSubmit}>
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
              {places?.map((place: Place) => {
                return (
                  <option key={place._id} value={place._id}>
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
                  <option key={category._id} value={category._id}>
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
              onClick={() => {
                const dialog = document.getElementById(
                  "addItemDialog",
                ) as HTMLDialogElement;
                dialog?.close();
              }}
            >
              Beenden <XMarkIcon className="w-4" />
            </button>

            <button
              className="btn  btn-primary"
              type="submit"
              onClick={() => {
                const dialog = document.getElementById(
                  "addItemDialog",
                ) as HTMLDialogElement;
                dialog?.close();
              }}
            >
              Hinzufügen <PlusIcon className="w-4" />
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
