import { Place, PopulatedPlace } from "@/app/lib/definitions/place.definitions";
import { Item } from "@/app/lib/definitions/item.definitions";
import { CubeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import dataUrl from "@/app/lib/util/dataUrl";
import { PopulatedSlot } from "@/app/lib/definitions/slot.definitions";

export default function PlaceElement({ place }: { place: PopulatedPlace<"items slots"> }) {
  if(!place) return (<><span>No Place defined.</span></>)
  const image = place.image;
  // @ts-ignore
  const base64Image = place?.image
  // @ts-ignore
    ? Buffer.from(image["data"]).toString("base64")
    : "";
  const url = dataUrl.create(place.image as any);
  console.log(place);

  return (
    <a href={`/places/${place._id}`} className="block">
      <div className="card glass h-auto  text-center">
        <figure>            
          <Image src={url !== ""? url : "https://picsum.photos/200"} priority={false} alt="Landscape picture" width={800} height={500} />
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
