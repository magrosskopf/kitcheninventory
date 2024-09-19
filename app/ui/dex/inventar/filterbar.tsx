import { getCategories } from "@/app/lib/api/category.service";
import { getPlaces } from "@/app/lib/api/place.service";
import { Category } from "@/app/lib/definitions/category.definitions";
import { Place } from "@/app/lib/definitions/place.definitions";
import { useEffect, useState } from "react";

export default function FilterBar({onFilterChange, onSortChange}: {onFilterChange: Function, onSortChange: Function}) {
  const [places, setPlaces] = useState<Place[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("category", event.target.value);
  };

  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("place", event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange("amount", event.target.value);
  };

  useEffect(() => {
    getPlaces("667da0d067b0fd272f7630dd").then(_places => setPlaces(JSON.parse(_places)))
    getCategories("667da0d067b0fd272f7630dd").then(_categories => setCategories(JSON.parse(_categories)))
  }, [])
  return (
    <div className="flex flex-row">
      <select className="select select-bordered w-1/3 mr-2" onChange={handlePlaceChange} defaultValue="">
        <option disabled>Lagerort</option>
        {places?.map(place => {
          return(
            <option value={place._id} key={place._id}>{place.name} </option>
          )
        })}
      </select>
      <select className="select select-bordered w-1/3 mr-2" onChange={handleCategoryChange} defaultValue="">
        <option disabled>Kategorie</option>
        <option>Obst</option>
        <option>Gemüse</option>
        <option>Beilagen</option>
      </select>
      <select className="select select-bordered w-1/3" onChange={handleAmountChange} defaultValue="">
        <option disabled>Menge</option>
        <option>Aufsteigend</option>
        <option>Absteigend</option>
      </select>
    </div>
  );
}
