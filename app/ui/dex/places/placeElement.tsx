import { Place } from "@/app/lib/definitions/place.definitions";
import { CubeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function PlaceElement( {place}: {place: Place} ) {
  console.log("##", place.image);
  const base64Image = Buffer.from(place.image.data).toString("base64")
  const dataUrl = `data:image/png;base64,${base64Image}`
  return (
    <a href={`/places/${place._id}`} className="block">
      <div className="card glass h-32  text-center">
        <figure>
        <Image
          src={dataUrl}
          alt="Landscape picture"
          width={800}
          height={500}
        />
        </figure> 
        <div className="card-body p-1">
          <p className="">{place.name}</p>

        </div>
      </div>
    </a>
  );
}
