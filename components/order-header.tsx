import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";

const OrderHeader = () => {
  return (
    <section className="border-b border-neutral-400 p-8 flex flex-row justify-between bg-white">
      <div>
        <header className="text-2xl font-bold">Order Management</header>
        <span>Manage Orders Data</span>
      </div>

      <Link
        className="flex flex-row bg-violet-400 items-center gap-2 p-4 rounded-xl hover:bg-violet-800 hover:text-white transition-all"
        href="/orders/create"
      >
        <Plus />
        Create New Order
      </Link>
    </section>
  );
};

export default OrderHeader;
