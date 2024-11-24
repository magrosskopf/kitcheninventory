import { PopulatedPlace } from "@/app/lib/definitions/place.definitions";
import PlaceElement from "./placeElement";

export default function PlacesGridItem({places}: {places: PopulatedPlace<"items slots">[]}) {
    if (!places) return <>Not working</>
    return (
      <div className="h-full grid grid-cols-3 gap-4">
        {places.length == 0 && (
          <p className="small">Keine Lagerorte definiert.</p>
        )}
        {places.map((place, i) => {
          return <PlaceElement key={i} place={place} />;
        })}
      </div>
    );
  }