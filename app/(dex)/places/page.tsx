import AddPlaceBtn from "@/app/ui/dex/places/addPlaceBtn";
import AddPlaceDialog from "@/app/ui/dex/places/addPlaceDialog";
import PlaceGrid from "@/app/ui/dex/places/placeGrid";
import Divider from "@/app/ui/divider";
import { Suspense } from "react";
export default async function Page() {
  return (
    <main className="relative h-auto">
      <h1 className={` mb-4 text-xl md:text-2xl`}>Lagerorte</h1>
      <Divider />
      <PlaceGrid />
      <AddPlaceDialog />
      <AddPlaceBtn />
    </main>
  );
}
