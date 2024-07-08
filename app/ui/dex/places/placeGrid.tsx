import { Place } from "@/app/lib/definitions/place.definitions";
import PlaceElement from "./placeElement";
import mongoose from "mongoose";
export default function PlacesGrid() {
  const places: Place[] = [
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Kühlschrank",
      userId: "667da0d067b0fd272f7630dd",
    },
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Schrank oben rechts",
      userId: "667da0d067b0fd272f7630dd",
    },
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Obstschale",
      userId: "667da0d067b0fd272f7630dd",
    },{
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Obstschale",
      userId: "667da0d067b0fd27d2f7630dd",
    },
  ];

  return (
    <div className="h-full grid grid-cols-3 gap-4">
      {places.map((place, i) => {
        return <PlaceElement key={i} place={place} />;
      })}
    </div>
  );
}
