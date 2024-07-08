"use client";
import PlaceGrid from "@/app/ui/dex/places/placeGrid";
import Divider from "@/app/ui/divider";
import { useParams } from "next/navigation";
import { Suspense } from "react";
export default async function Page() {
    const { id } = useParams<{ id: string }>();
  return (
    <main className="relative h-auto">
      <h1 className={` mb-4 text-xl md:text-2xl`}>Ort {id}</h1>
      
    </main>
  );
}
