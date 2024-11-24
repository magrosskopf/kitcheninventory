"use server";
import connectToDatabase from "@/app/lib/database/mongoose";
import PlaceModel, {
  PopulatedPlace,
} from "@/app/lib/definitions/place.definitions";
import SlotModel, { Slot } from "../definitions/slot.definitions";
import ItemModel from "../definitions/item.definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function createPlace(place: any) {
  try {
    await connectToDatabase();
    const newPlace = new PlaceModel(place);
    let result = await newPlace.save();
    return result? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createSlot(tempSlot: {
  capacity: number;
  item: string;
}) {
  try {
    await connectToDatabase();
    const newSlot = new SlotModel(tempSlot);
    const result = await newSlot.save();
    if (result && result._id) {
      return result._id.toString();
    } else {
      throw new Error("Slot creation failed");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPlaces(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("No User")
  }
  await connectToDatabase();
  const places = await PlaceModel.find({ userId: session?.user.id }).populate("items").populate({
    path: 'slots', 
    populate: {
      path: 'item', 
    },
  });
  return JSON.stringify(places);
}

export async function getPlaces2(): Promise<PopulatedPlace<"items slots">[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("No User")
  }
  await connectToDatabase();
  const places = await PlaceModel.find({ userId: session?.user.id }).populate("items").populate({
    path: 'slots', 
    populate: {
      path: 'item', 
    },
  }) as unknown as PopulatedPlace<"items slots">[];
  await delay(2000); 
  return places;
}

export async function getPlace(
  id: string,
): Promise<PopulatedPlace<"slots" | "items">> {
  const session = await getServerSession(authOptions);
  await connectToDatabase();
  const place = await PlaceModel.findOne({ _id: id, userId: session?.user.id })
    .populate("slots")
    .populate("items");

  const stringPlace = JSON.stringify(place);
  return JSON.parse(stringPlace);
}

export async function deleteSlot(id: string) {
  return await SlotModel.deleteOne({ _id: id });
}

export async function updateSlot(slot: Slot | undefined) {
  if (!slot) return;
  return await SlotModel.updateOne({ _id: slot._id }, slot);
}

export async function addSlotToPlace(slotId: string, placeId: string) {
  return await PlaceModel.updateOne(
    { _id: placeId },
    { $push: { slots: slotId } },
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}