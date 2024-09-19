"use client";
import { PlusIcon, QrCodeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Divider from "@/app/ui/divider";
import { createItem, getItem, updateItem } from "@/app/lib/api/item.service";
import { Place } from "@/app/lib/definitions/place.definitions";
import { Category } from "@/app/lib/definitions/category.definitions";
import { getPlaces } from "@/app/lib/api/place.service";
import { useState, useEffect } from "react";
import { Item } from "@/app/lib/definitions/item.definitions";
import mongoose from "mongoose";
import { useParams, useRouter } from "next/navigation";
import Toast from "@/app/ui/toast";

export default function EditItemDialog() {
  const { id } = useParams<{ id: string }>();
  const [places, setPlaces] = useState<Place[]>();
  const [item, setItem] = useState<Item>();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const showToast = (message: string, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 3000); // Toast verschwindet nach 3 Sekunden
  };
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    getItem("667da0d067b0fd272f7630dd", id).then((item) => {
      console.log(item);

      if (item) setItem(JSON.parse(item));
    });
    getPlaces("667da0d067b0fd272f7630dd").then((places) => {
      let _places = JSON.parse(places) as Place[];
      setPlaces(_places);
    });
  }, [id]);

  const handleItemChange = (field: string, value: any) => {
    if (!item) {
      showToast("No Item selected", "error");
      throw new Error("No Item selected");
    }

    const updatedItem = { ...item, [field]: value }; // Neuen Zustand berechnen
    setItem(updatedItem); // Zustand aktualisieren

    updateItem(updatedItem); // Den neuen Zustand direkt übergeben
    showToast("Item updated", "success");
  };

  const categories: Category[] = [
    {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "Obst",
    },
    {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "Milch",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between mt-5">
        <h3 className="font-bold text-lg">Edit Product</h3>
        <QrCodeIcon className="w-6 text-secondary" />
      </div>
      <Divider />
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          type="text"
          name="name"
          value={item?.name}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => handleItemChange("name", e.target.value)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Menge</span>
        </div>
        <input
          type="number"
          name="amount"
          value={item?.amount}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => handleItemChange("amount", Number(e.target.value))}
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
          onChange={(e) => handleItemChange("place", e.target.value)}
        >
          <option disabled>Pick one</option>
          {places?.map((place: Place) => {
            return (
              <option
                key={place._id}
                value={place._id}
                selected={item?.place === place._id}
              >
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
      <div className="flex w-full flex-row  justify-between">
        <a href={`/inventar`} className="btn  btn-secondary">
          Beenden <XMarkIcon className="w-4" />
        </a>
      </div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "info" })}
        />
      )}
    </>
  );
}
