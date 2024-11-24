import { getPlaces, getPlaces2 } from "@/app/lib/api/place.service";
import { authOptions } from "@/app/lib/auth/authOptions";
import { PopulatedPlace } from "@/app/lib/definitions/place.definitions";
import AddPlaceBtn from "@/app/ui/dex/places/addPlaceBtn";
import AddPlaceDialog from "@/app/ui/dex/places/addPlaceDialog";
import PlaceGrid from "@/app/ui/dex/places/placeGrid";
import { PlaceGridSkeleton } from "@/app/ui/dex/places/placeGridSkeleton";
import Divider from "@/app/ui/divider";
import { ItemComponentSkeleton } from "@/app/ui/skeletons";
import { getServerSession } from "next-auth";
import { Suspense } from 'react';


export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (<><span>Not Logged In</span></>)
  }
  return (
    <main className="relative h-auto">
      <h1 className={` mb-4 text-xl md:text-2xl`}>Lagerorte</h1>
      <Divider />
      <Suspense fallback={<PlaceGridSkeleton />}>
        <PlaceGrid />
      </Suspense>
      <AddPlaceDialog session={session} />
      <AddPlaceBtn />
    </main>
  );
}
