import { Place } from "@/app/lib/definitions/place.definitions";
import { CubeIcon } from "@heroicons/react/24/outline";

export default function PlaceElement( {place}: {place: Place} ) {
  return (
    <a href={`/places/${place.id}`} className="block">
      <div className="card glass h-32  text-center">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
        </figure> 
        <div className="card-body p-1">
          <p className="">{place.name}</p>

        </div>
      </div>
    </a>
  );
}
