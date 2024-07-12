"use server";
import connectToDatabase from "@/app/lib/database/mongoose";
import PlaceModel, { Place } from "@/app/lib/definitions/place.definitions";
import SlotModel from "../definitions/slot.definitions";

export async function createPlace(place: Place) {
    try {
      await connectToDatabase();

      const newPlace = new PlaceModel(place)
      let result = await newPlace.save();
      console.log(result);
      
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  export async function createSlot(tempSlot: { name: string; capacity: number; item: string; }) {
    try {
      await connectToDatabase();
      const newSlot = new SlotModel(tempSlot)
      const result = await newSlot.save()
      return result._id.toString()
    } catch (error) {
      console.log(error);
      
    }
    
  }

export async function getPlaces(userId: string) {
    const places = await PlaceModel.find().populate('slots');
    return JSON.stringify(places)
}