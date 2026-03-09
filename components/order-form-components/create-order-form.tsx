"use client";

import Form from "next/form";
import { Customer, CustomerOption, ProductOption } from "@/app/types";
import { useState } from "react";

type CreateOrderProps = {
  customers: CustomerOption[];
  products: ProductOption[];
};

const CreateOrderForm = ({ customers, products }: CreateOrderProps) => {
  const handleSubmit = () => {
    return "Hello";
  };

  const [formData, setFormData] = useState({
    customerId: "",
    customer: "",
    orderDate: new Date(),
    status: "pending",
    total: "",
    items: {
      productId: "",
      product: "",
      quantity: "",
      price: "",
    },
  });

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <form className="grid  border-neutral-400 p-12 rounded-xl">
      <section className="  flex flex-col gap-6  border-neutral-400 p-12 rounded-xl ">
        <article className="flex flex-col gap-6">
          <label className="font-semibold text-lg" htmlFor="customerId">
            Customer
          </label>
          <select
            name="customer"
            id="customerId"
            defaultValue={""}
            className="border rounded-xl px-2 py-4"
          >
            <option value="" disabled>
              -- Select Customer --
            </option>
            {customers.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} | {i.email}
              </option>
            ))}
          </select>
        </article>
        <article className="flex flex-row gap-6">
          <div className="flex flex-col gap-6">
            <label className="font-semibold text-lg" htmlFor="productId">
              Products
            </label>
            <select
              name="product"
              id="productId"
              defaultValue={""}
              className="border rounded-xl px-2 py-4"
            >
              <option value="" disabled>
                -- Select Product --
              </option>
              {products.map((i) => (
                <option key={i.id}>
                  {i.id} | {i.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-6">
            <label className="font-semibold text-lg ">Qty</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
              <button
                onClick={handleDecrement}
                className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                aria-label="Decrease quantity"
              >
                <span className="text-gray-700">−</span>
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                readOnly
                className="w-12 text-center border-none focus:ring-0 focus:outline-none py-1.5 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={handleIncrement}
                className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                aria-label="Increase quantity"
              >
                <span className="text-gray-700">+</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-lg">
              Subtotal
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.items.price}
              min="1"
              readOnly
              className="w-12 text-center border-none focus:ring-0 focus:outline-none py-1.5 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </article>
      </section>
      {/*  <div className="grid-rows-2 flex flex-row justify-evenly">
        <button
          type="submit"
          className="text-black w-1/3 bg-green-400 py-2 rounded-xl hover:bg-green-600 transition-all hover:cursor-pointer "
        >
          Create
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="text-black w-1/3  bg-red-400 py-2 rounded-xl hover:bg-red-600 transition-all hover:cursor-pointer "
        >
          Cancel
        </button>
      </div> */}
    </form>
  );
};

export default CreateOrderForm;
