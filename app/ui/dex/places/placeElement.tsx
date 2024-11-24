import { PopulatedPlace } from "@/app/lib/definitions/place.definitions";
import { Item } from "@/app/lib/definitions/item.definitions";
import Image from "next/image";
import dataUrl from "@/app/lib/util/dataUrl";
import { PopulatedSlot } from "@/app/lib/definitions/slot.definitions";

export default function PlaceElement({ place }: { place: PopulatedPlace<"items slots"> }) {
  if(!place) return (<><span>No Place defined.</span></>)
  let url = "https://picsum.photos/200"
  if (place.image.length > 0) url = dataUrl.create(place.image as any);
  return (
    <a href={`/places/${place._id}`} className="block">
      <div className="card glass h-auto  text-center">
        <figure>            
          <Image src={url} priority={false} alt="Landscape picture" width={800} height={500} />
        </figure>
        <div className="card-body p-1">
          <p className="">{place.name}</p>

          {place.slots &&
            <ul>
              {place.slots?.map((slot: PopulatedSlot<"item">, index: number) => {
                const _slot = slot as PopulatedSlot<"item">
                const amount = place.items?.find((item: Item )=> item._id === _slot.item._id)?.amount || 0
                return (
                  <li key={index} className={`${amount >= slot.capacity ? "text-orange-600" : ""} w-full flex flex-row text-sm`}>
                    <span className="w-full">{_slot.item.name}</span>
                    <span className="w-full">{amount}/{_slot.capacity}</span>
                  </li>
                )
              })}
              
            </ul>
          }
        </div>
      </div>
    </a>
  );
}
