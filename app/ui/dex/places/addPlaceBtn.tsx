"use client";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AddPlaceBtn() {
  return (
    <div className="flex flex-row sticky bottom-20 justify-end">
      <button
        className="btn btn-circle btn-accent"
        onClick={() => {
          const dialog = document.getElementById(
            "addPlaceDialog",
          ) as HTMLDialogElement;
          dialog?.showModal();
        }}
      >
        <PlusCircleIcon className="w-7" />
      </button>
    </div>
  );
}
