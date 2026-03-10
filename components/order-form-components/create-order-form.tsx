"use client";

import Form from "next/form";
import { Customer, CustomerOption, Product, ProductOption } from "@/app/types";
import { useState } from "react";

type CreateOrderProps = {
  customers: CustomerOption[];
  products: ProductOption[];
};

const CreateOrderForm = ({ customers, products }: CreateOrderProps) => {
  const handleSubmit = () => {
    return "Hello";
  };

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    customerId: "",
    customer: "",
    orderDate: new Date(),
    status: "pending",
    total: "",
    items: items,
  });

  const handleIncrement = (index: number) =>
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, quantity: Number(item.quantity) + 1 } : item,
      ),
    );

  const handleDecrement = (index: number) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, quantity: Number(item.quantity) - 1 } : item,
      ),
    );
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const selectedId = e.target.value.split(" | ")[0];
    const selected = products.find((p) => selectedId === p.id);

    if (!selected) return;

    setItems(
      items.map((item, i) =>
        i === index ? { ...item, price: selected.price } : item,
      ),
    );
  };

  const handleAddNewItem = () => {
    const newItem = { productId: "", quantity: 1, price: 0 };

    const newArray = [...items, newItem];

    setItems(newArray);
  };

  return (
    <form className="grid  border-neutral-400 p-12 rounded-xl ">
      <section className="  flex flex-col gap-6  border-neutral-400 py-12 rounded-xl  px-28 border">
        {/* Customer Select */}
        <section className="flex flex-col gap-6">
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
        </section>
        {/* Product Select */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-6 items-center">
          <label className="font-semibold text-lg">Products</label>
          <label className="font-semibold text-lg">Qty</label>
          <label className="font-semibold text-lg">Subtotal</label>
        </div>

        {items.map((i, index) => (
          <section
            key={index}
            className="grid grid-cols-[1fr_auto_auto] gap-6 items-center"
          >
            <select
              name="product"
              id="productId"
              defaultValue={""}
              className="border rounded-xl px-2 py-4"
              onChange={(e) => {
                handleProductChange(e, index);
              }}
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

            {/* Quantity Selector */}

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
              <button
                type="button"
                onClick={() => handleDecrement(index)}
                className={`p-3 transition-colors focus:outline-none ${
                  items[index].quantity <= 1
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                aria-label="Decrease quantity"
                disabled={items[index].quantity <= 1}
              >
                <span className="text-gray-700">−</span>
              </button>
              <input
                type="number"
                id="quantity"
                value={items[index].quantity}
                min="1"
                readOnly
                className="w-12 text-center border-none focus:ring-0 focus:outline-none py-1.5 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => handleIncrement(index)}
                className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                aria-label="Increase quantity"
              >
                <span className="text-gray-700">+</span>
              </button>
            </div>

            {/* Total Price */}
            <div className="ml-auto">
              <input
                type="number"
                id="subtotal"
                value={
                  Number(items[index].quantity) * Number(items[index].price)
                }
                min="1"
                readOnly
                className=" text-center font-bold text-lg focus:outline-none py-1.5 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </section>
        ))}
        <div className="text-center">
          <button
            onClick={handleAddNewItem}
            type="button"
            className="border border-dotted p-4 rounded-xl w-full text-neutral-600 hover:text-neutral-800 hover:cursor-pointer transition-all"
          >
            + Add Another Item
          </button>
        </div>
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
