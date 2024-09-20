import { getCategories } from "@/app/lib/api/category.service";
import { getPlaces } from "@/app/lib/api/place.service";
import { Category } from "@/app/lib/definitions/category/category.definitions";
import { useCategories } from "@/app/lib/definitions/category/category.store";
import { Place } from "@/app/lib/definitions/place.definitions";
import { useEffect, useState } from "react";

export default function FilterBar({onFilterChange}: {onFilterChange: Function, onSortChange: Function}) {
  const [places, setPlaces] = useState<Place[]>([])
  // const [categories, setCategories] = useState<Category[]>([])
  const categories: Category[] = useCategories((state: any) => state.categories)
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("category", event.target.value);
  };

  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("place", event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("amount", event.target.value);
  };

  useEffect(() => {
    getPlaces("667da0d067b0fd272f7630dd").then(_places => setPlaces(JSON.parse(_places)))
  }, [])
  return (
    <div className="flex flex-row">
      <select className="select select-bordered w-1/3 mr-2" onChange={handlePlaceChange} defaultValue="">
        <option value="">Lagerort</option>
        {places?.map(place => {
          return(
            <option value={place._id} key={place._id}>{place.name} </option>
          )
        })}
      </select>
      <select className="select select-bordered w-1/3 mr-2" onChange={handleCategoryChange} defaultValue="">
        <option value="">Kategorie</option>
       {categories.map(category => {
        return (
          <option value={category._id} key={category._id}>{category.name}</option>
        )
       })}
      </select>
      <select className="select select-bordered w-1/3" onChange={handleAmountChange} defaultValue="">
        <option value="">Sortieren</option>
        <option value="asc">Aufsteigend</option>
        <option value="desc">Absteigend</option>
      </select>
    </div>
  );
}
