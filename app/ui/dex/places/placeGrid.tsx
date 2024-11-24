
import { getPlaces2 } from "@/app/lib/api/place.service";
import PlacesGridItem from "./placeGridItem";
export default async function PlacesGrid() {
  const places = await getPlaces2()
  return (
    <>
      <PlacesGridItem places={places}></PlacesGridItem>
    </>
  );
}


