"use server";

import connectToDatabase from "../database/mongoose";
import CategoryModel from "../definitions/category/category.definitions";

export async function getCategories(userId?: string): Promise<string> {
    await connectToDatabase();
    return JSON.stringify(
        await CategoryModel.find(),
    );
} 