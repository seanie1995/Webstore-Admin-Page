"use client";

import { CustomerOption, Order, ProductOption } from "@/app/types";
import { ChangeEvent, Fragment, useState } from "react";
import { Trash2 } from "lucide-react";
import { CreateNewOrder } from "@/lib/orderActions";
import { FetchCustomerById } from "@/lib/customerActions";
import { useRouter } from "next/navigation";

type CreateOrderProps = {
  customers: CustomerOption[];
  products: ProductOption[];
};

const CreateOrderForm = ({ customers, products }: CreateOrderProps) => {
  const router = useRouter();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [items, setItems] = useState<Order["items"]>([
    {
      productId: 0,
      quantity: 1,
      price: 0,
      title: "",
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOption | null>(null);

  const handleCreateNewOrder = async () => {
    if (!selectedCustomer) return;

    try {
      const totalPrice = items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );

      const customerObject = await FetchCustomerById(selectedCustomer.id);

      const order: Omit<Order, "id"> = {
        customerId: selectedCustomer?.id,
        customer: customerObject,
        status: "pending",
        total: totalPrice,
        items: items,
        orderDate: new Date().toISOString(),
      };

      await CreateNewOrder(order);
      setStatus("success");
      setTimeout(() => router.push("/orders"), 3000);
    } catch (error) {
      console.error("Failed to create new order");
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleCustomerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomerId = e.target.value;
    const selectedCustomer =
      customers.find((c) => c.id === selectedCustomerId) || null;

    setSelectedCustomer(selectedCustomer);
  };

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
        i === index
          ? {
              ...item,
              productId: Number(selected.id),
              price: selected.price,
              title: selected.name,
            }
          : item,
      ),
    );
  };

  const handleAddNewItem = () => {
    const newItem = { productId: 0, quantity: 1, price: 0 };

    const newArray = [...items, newItem];

    setItems(newArray);
  };

  const handleDeleteItem = (indexToRemove: number) => {
    const newArray = items.filter((_, index) => index !== indexToRemove);

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
            onChange={handleCustomerChange}
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
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-4 items-center">
          <label className="font-semibold text-lg">Products</label>
          <label className="font-semibold text-lg">Qty</label>
          <label className="font-semibold text-lg">Subtotal</label>

          {items.map((item, index) => (
            <Fragment key={index}>
              <select
                key={index}
                defaultValue=""
                className="border rounded-xl px-2 py-4"
                onChange={(e) => handleProductChange(e, index)}
              >
                <option value="" disabled>
                  -- Select Product --
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} | {p.name}
                  </option>
                ))}
              </select>

              <div
                key={`qty-${index}`}
                className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => handleDecrement(index)}
                  disabled={item.quantity <= 1}
                  className={`p-3 transition-colors focus:outline-none ${
                    item.quantity <= 1
                      ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  −
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="w-12 text-center border-none focus:ring-0 focus:outline-none py-1.5 bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => handleIncrement(index)}
                  className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                >
                  +
                </button>
              </div>

              <span
                key={`subtotal-${index}`}
                className="font-bold text-lg text-center grid grid-cols-2 gap-2"
              >
                {(Number(item.quantity) * Number(item.price)).toFixed(2)}
                <button type="button" onClick={() => handleDeleteItem(index)}>
                  <Trash2 className="py-1 text-red-600 hover:text-red-800 hover:cursor-pointer " />
                </button>
              </span>
            </Fragment>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleAddNewItem}
            type="button"
            className="border border-dotted p-4 rounded-xl w-full text-neutral-600 hover:text-neutral-800 hover:cursor-pointer transition-all"
          >
            + Add Another Item
          </button>
        </div>
        <div className="grid-rows-2 flex flex-row justify-evenly">
          <button
            onClick={() => handleCreateNewOrder()}
            type="button"
            className="text-black w-1/3 bg-green-400 py-2 rounded-xl hover:bg-green-600 transition-all hover:cursor-pointer "
          >
            Create
          </button>

          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="text-black w-1/3  bg-gray-400 py-2 rounded-xl hover:bg-gray-600 hover:text-white transition-all hover:cursor-pointer "
          >
            Return
          </button>
        </div>
      </section>
      {status !== "idle" && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg text-white font-semibold transition-all animate-bounce ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status === "success"
            ? "✅ Order created successfully!"
            : "❌ Failed to create order."}
        </div>
      )}
    </form>
  );
};

export default CreateOrderForm;
