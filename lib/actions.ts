"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { API_URL } from "./config";
import { Product, ProductsResponse } from "@/app/types";

export const FetchAllCategories = async () => {
  const data = await fetch(`${API_URL}/categories`).then((res) => res.json());

  return data;
};

export const FetchAllProducts = async (
  limit = 6,
  page = 1,
  sort = "id",
  order = "asc",
  query = "",
  categoryId = "",
): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    _limit: limit.toString(),
    _sort: sort,
    _page: page.toString(),
    _order: order,
    title_like: query,
    _expand: "category",
  });

  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  const baseUrl = `${API_URL}/products?${params}`;

  const data = await fetch(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
};

export const FetchSingleProductById = async (id: string) => {
  const data = await fetch(`${API_URL}/products/${id}`).then((res) =>
    res.json(),
  );

  return data;
};

/*  
    "title",
    "price",
    "description",
    "thumbnail",
    "categoryId",
    "brand",
*/

export const CreateProduct = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  let availabilityStatus: string;

  if (Number(stock) >= 25) {
    availabilityStatus = "In Stock";
  } else if (Number(stock) < 25 && Number(stock) > 0) {
    availabilityStatus = "Low Stock";
  } else if (Number(stock) === 0) {
    availabilityStatus = "Out of Stock";
  } else {
    throw new Error();
  }

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
    availabilityStatus,
  };

  console.log(newProduct);

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    throw new Error("Failed to create product");
  }
};

export const UpdateProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  let availabilityStatus: string;

  if (Number(stock) >= 25) {
    availabilityStatus = "In Stock";
  } else if (Number(stock) < 25 && Number(stock) > 0) {
    availabilityStatus = "Low Stock";
  } else if (Number(stock) === 0) {
    availabilityStatus = "Out of Stock";
  } else {
    throw new Error();
  }

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
    availabilityStatus,
  };

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();

  revalidatePath("/");
  redirect("/");
};

export async function UpdateProductBind(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  const brand = formData.get("brand") as string;

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    price: parseInt(price, 10),
    categoryId: parseInt(categoryId, 10),
    stock: parseInt(stock, 10),
  };

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();

  revalidatePath("/");
  redirect("/");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  revalidatePath("");
  console.log(data);
}

export const DeleteProductById = async (id: string) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;

  revalidatePath("");
};

export async function deleteProductBind(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  revalidatePath("");
  console.log(data);
}
