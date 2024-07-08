"use server";
import ItemModel, { Item } from "../definitions/item.definitions";
import connectToDatabase from "../database/mongoose";
import mongoose from "mongoose";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createItem(prevState: State, formData: FormData) {
  try {
    await connectToDatabase();
    const item = formDataToObject(formData);
    const newItem = new ItemModel({
      name: item.name,
      amount: item.amount,
      category: item.category,
      place: item.place,
      user: "667da0d067b0fd272f7630dd",
    });
    await newItem.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateItem(item: Item) {
  console.log(item);
  
 let result = await ItemModel.updateOne({_id: item._id}, item)
  console.log(result)
}

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function getItems(userId: string) {
  return await ItemModel.find({ user: userId }); //.populate('place category user');
}

export async function deleteItem(itemId: string) {
  let res = await ItemModel.deleteOne({ _id: itemId });
  console.log(res);

  return true;
}
