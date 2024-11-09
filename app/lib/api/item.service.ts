"use server";
import ItemModel, { Item } from "../definitions/item.definitions";
import connectToDatabase from "../database/mongoose";
import PlaceModel from "../definitions/place.definitions";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createItem(formData: FormData): Promise<string | boolean> {
  const session: Session | null = await getServerSession(authOptions)
  if(!session || !session.user) return false
  try {
    await connectToDatabase();
    const item = formDataToObject(formData);
    const newItem = new ItemModel({
      name: item.name,
      amount: item.amount,
      category: item.category,
      place: item.place,
      user: session.user.id,
    });
    const savedItem = await newItem.save();
    console.log("savedItem",savedItem);
    
    await PlaceModel.findByIdAndUpdate(
      item.place,
      { $push: { items: savedItem } }, // Angenommen, Place hat ein items-Feld, das eine Liste von Item-IDs ist
    );

    return JSON.stringify(newItem.toObject() as Item);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateItem(item: Item) {
  let result = await ItemModel.updateOne({ _id: item._id }, item);
  console.log(result);
}

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function getItems() {
  const session = await getServerSession(authOptions);
  await connectToDatabase();
  return JSON.stringify(
    await ItemModel.find({ user: session?.user.id }).populate("place category"),
  );
}

export async function getItem(
  itemId: string,
): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const item = await ItemModel.findOne({ user: session?.user.id, _id: itemId });
  return JSON.stringify(item);
}

export async function deleteItem(itemId: string) {
  let res = await ItemModel.deleteOne({ _id: itemId });
  return res.acknowledged;
}
