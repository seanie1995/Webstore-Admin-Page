import React from "react";
import { API_URL } from "@/lib/config";
import Form from "next/form";
import type { Category, Product } from "@/app/types";
import { UpdateProduct } from "@/lib/actions";

const EditForm = async ({ product }: { product: Product }) => {
  const categories: Category[] = await fetch(`${API_URL}/categories`).then(
    (res) => res.json(),
  );

  return (
    <Form action={UpdateProduct} classID="grid gap-4">
      <input readOnly name="id" value={product.id} />
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          className="border-p2 bg-white"
          type="text"
          id="title"
          name="title"
          minLength={3}
          maxLength={20}
          defaultValue={product.title}
          required
        />
        <label htmlFor="brand" className="font-semibold">
          Brand
        </label>
        <input
          className="border-p2 bg-white"
          type="text"
          id="brand"
          name="brand"
          defaultValue={product.brand}
          required
        />
        <label htmlFor="price" className="font-semibold">
          Price
        </label>
        <input
          className="border p-2 bg-white "
          type="number"
          name="price"
          id="price"
          min="0.5"
          step="0.01"
          defaultValue={product.price}
          required
        />
        <label htmlFor="stock" className="font-semibold">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          id="stock"
          defaultValue={product.stock}
          required
          className="border p-2 bg-white"
        />{" "}
        <label className="font-semibold" htmlFor="categoryId">
          Category
        </label>
        <select
          id="category"
          name="categoryId"
          defaultValue={product.categoryId}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* <input
            className="border p-2 bg-white"
            type="number"
            id="categoryId"
            name="categoryId"
            defaultValue={product.categoryId}
            required
          /> */}
        <label className="font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="border p-2 bg-white"
          id="description"
          name="description"
          minLength={5}
          maxLength={400}
          defaultValue={product.description}
          required
        />
        <label className="font-semibold" htmlFor="thumbnail">
          Thumbnail
        </label>
        <input
          className="border p-2 bg-white"
          type="url"
          id="thumbnail"
          name="thumbnail"
          defaultValue={product.thumbnail}
          required
        />
      </div>
      <button type="submit">Save</button>
    </Form>
  );
};

export default EditForm;
