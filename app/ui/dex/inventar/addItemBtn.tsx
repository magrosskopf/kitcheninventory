"use client";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AddItemBtn() {
  return (
    <div className="flex flex-row sticky bottom-20 justify-end">
      <button
        className="btn btn-circle btn-accent"
        onClick={() => document.getElementById("addItemDialog")?.showModal()}
      >
        <PlusCircleIcon className="w-7" />
      </button>
    </div>
  );
}
