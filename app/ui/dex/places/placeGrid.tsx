"use client";
import { Place } from "@/app/lib/definitions/place.definitions";
import PlaceElement from "./placeElement";
import { getPlaces } from "@/app/lib/api/place.service";
import { useState, useEffect } from "react";
export default function PlacesGrid() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    getPlaces().then((_places: string) => {
      console.log(_places);
      
      setPlaces(JSON.parse(_places));
    });
  }, []); // Leere Abhängigkeitsliste sorgt dafür, dass der Effekt nur einmal ausgeführt wird

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
