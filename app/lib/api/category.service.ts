"use server";

import connectToDatabase from "../database/mongoose";
import CategoryModel from "../definitions/category.definitions";

export async function getCategories(userId?: string) {
    await connectToDatabase();
    return JSON.stringify(
        await CategoryModel.find(),
    );
} 