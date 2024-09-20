"use client";

import { getCategories } from "../lib/api/category.service";
import { useCategories } from "../lib/definitions/category/category.store";

  export default function DataWrapper() {
    const setCategories = useCategories((state:any) => state.setCategories)
    getCategories().then((_categories: string) => {
        setCategories(JSON.parse(_categories))
    })
    return (
      <></>
    );
  }
  