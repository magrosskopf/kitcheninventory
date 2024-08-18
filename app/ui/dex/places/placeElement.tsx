import { Place } from "@/app/lib/definitions/place.definitions";
import { CubeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import dataUrl from "@/app/lib/util/dataUrl";

export default function PlaceElement({ place }: { place: Place }) {
  const image = place.image;
  // @ts-ignore
  const base64Image = place?.image
  // @ts-ignore
    ? Buffer.from(image["data"]).toString("base64")
    : "";
  const url = dataUrl.create(place.image as any);
  return (
    <a href={`/places/${place._id}`} className="block">
      <div className="card glass h-32  text-center">
        <figure>
          {url != "" && (
            <Image src={url} alt="Landscape picture" width={800} height={500} />
          )}
        </figure>
        <div className="card-body p-1">
          <p className="">{place.name}</p>
        </div>
      </div>
    </a>
  );
}
