"use client";
import { getPlace } from "@/app/lib/api/place.service";
import { Item } from "@/app/lib/definitions/item.definitions";
import { PopulatedPlace } from "@/app/lib/definitions/place.definitions";
import ItemComponent from "@/app/ui/dex/inventar/item";
import Divider from "@/app/ui/divider";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dataUrl from "@/app/lib/util/dataUrl";
import SlotsComponent from "@/app/ui/dex/places/slotComponent";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<PopulatedPlace<"slots" | "items"> | null>(
    null,
  );
  const [image, setImage] = useState<string>();
  const [shiftedItemId, setShiftedItemId] = useState(-1);
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    if (id) {
      getPlace(id).then((place: PopulatedPlace<"slots" | "items">) => {
        setPlace(place);
        setImage(dataUrl.create(place.image as any));
      });
    }
  }, [id]);

  const handleDeleteItem = (deletedItemId: string) => {
    setItems(items.filter((item) => item._id !== deletedItemId));
    setShiftedItemId(-1);
  };

  const handleSwipe = (id: number) => {
    setShiftedItemId(id);
  };

  return (
    <main className="relative h-auto">
      <div className="columns-2">
        <div className="avatar w-full">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            {image != "" && (
              <Image
                src={image || ""}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <h1 className={` mb-4 text-xl md:text-2xl`}> {place?.name}</h1>
          <small>Slots: {place?.slots?.length}</small>
          <br />
          <small>Items: {place?.items?.length}</small>
        </div>
      </div>
      <Divider />
      <div className="mt-5">
        <ul>
          {place?.items?.map((item, i) => {
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
      </div>
      <Divider />
      <div className="mt-5">
        <ul>
          {place?.slots?.map(slot => {
            return (
              <>
                <p>

                  </p>
              </>
            )
          })}
          <li></li>
        </ul>
      </div>
      <Divider />
      <div className="mt-5">
        {place && <SlotsComponent _slots={place.slots} _items={place.items} placeId={id} />}
      </div>
    </main>
  );
}
