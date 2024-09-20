"use client";
import { deleteItem, updateItem } from "@/app/lib/api/item.service";
import { Item } from "@/app/lib/definitions/item.definitions";
import {
  TagIcon,
  MapPinIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ItemComponent({
  id,
  isShifted,
  data,
  onSwipe,
  onDelete,
}: {
  id: number;
  isShifted: boolean;
  data: Item;
  onSwipe: any;
  onDelete: (deletedItemId: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [itemData, setItemData] = useState(data);
  const handleDelete = async (event: any) => {
    event.preventDefault();
    if (!isShifted) return;
    setLoading(true);
    try {
      await deleteItem(itemData._id);
      onDelete(itemData._id);
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  const itemRef = useRef(null);

  let xDown: number | null = null;
  let yDown: number | null = null;

  const handleTouchStart = (evt: any) => {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt: any) => {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        onSwipe(id);
      } else {
        onSwipe(null);
      }
    }

    xDown = null;
    yDown = null;
  };
  const decreaseItemAmount = (): void => {
    if (isItemEmpty(itemData)) return
    setItemData({ ...itemData, amount: itemData.amount - 1 });
    itemData.amount -= 1;
    updateItem(itemData);
  };

  const increaseItemAmount = (): void => {
    setItemData({ ...itemData, amount: itemData.amount + 1 });
    itemData.amount += 1;
    updateItem(itemData);
  };

  const isItemEmpty = (item: Item): boolean => {
    return item.amount === 0
  } 

  return (
    <li className="relative mb-3">
      <div
        ref={itemRef}
        className={`grid grid-cols-2 w-full h-32 bg-base-300 rounded-md  place-items-center transform transition-transform duration-300 ease-in-out ${isShifted ? "-translate-x-20" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="label-container flex flex-col">
          <h2 className="text-accent text-md hyphens-auto line-clamp-1">{itemData.name}</h2>
          <div className="text-sm flex flex-row text-content">
            <TagIcon className="w-4 mr-2" />
            <span className="text-sm">{itemData.category?.map(c => c.name) }</span>
          </div>
          <div className="text-sm flex flex-row text-content">
            <MapPinIcon className="w-4 mr-2" />
            {itemData.place?.name}
          </div>
        </div>
        <div className="quantity-buttons flex flex-row px-2">
          <button className="btn btn-circle" onClick={increaseItemAmount}>
            <PlusCircleIcon className="w-4" />
          </button>
          <input
            type="number"
            disabled
            value={itemData.amount}
            className="input input-bordered w-full mx-2 max-w-xs"
          />
          <button className="btn btn-circle" onClick={decreaseItemAmount}>
            <MinusCircleIcon className="w-4" />
          </button>
        </div>
      </div>
      <div
        className={`absolute right-2 bottom-2 flex flex-col transition-opacity duration-300 ease-in-out ${isShifted ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        style={{ pointerEvents: isShifted ? "auto" : "none" }}
      >
        <Link
          href={`/inventar/${itemData._id}`}
          className="btn btn-edit btn-circle mb-1"
        >
          <PencilIcon className="w-4" />
        </Link>
        <button
          className={`btn btn-delete btn-circle mt-1 ${loading ? "loading loading-bars loading-lg  text-secondary" : ""}`}
          onClick={handleDelete}
          disabled={loading}
        >
          <TrashIcon className="w-4" />
        </button>
      </div>
    </li>
  );
}
