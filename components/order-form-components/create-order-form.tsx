"use client";

import Form from "next/form";
import { CustomerOption, ProductOption } from "@/app/types";

type CreateOrderProps = {
  customers: CustomerOption[];
  products: ProductOption[];
};

const CreateOrderForm = ({ customers, products }: CreateOrderProps) => {
  const handleSubmit = () => {
    return "Hello";
  };

  return (
    <Form
      action={handleSubmit()}
      className="grid  border-neutral-400 p-12 rounded-xl"
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center  border-neutral-400 p-12 rounded-xl ">
        <label className="font-semibold" htmlFor="productId">
          Product and Customer ID
        </label>
        <div className="flex justify-evenly flex-row">
          {" "}
          <select name="product" id="productId" defaultValue={""}>
            <option value="" disabled>
              Select Product
            </option>
            {products.map((i) => (
              <option key={i.id}>
                {i.id} | {i.name}
              </option>
            ))}
          </select>
          <select name="customer" id="customerId" defaultValue={""}>
            <option value="" disabled>
              Select Customer
            </option>
            {customers.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} | {i.email}
              </option>
            ))}
          </select>
        </div>

        <label className="font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="border p-2 bg-white"
          id="description"
          name="description"
          minLength={5}
          maxLength={400}
          required
        />
      </div>
      <div className="grid-rows-2 flex flex-row justify-evenly">
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
      </div>
    </Form>
  );
};

export default CreateOrderForm;
