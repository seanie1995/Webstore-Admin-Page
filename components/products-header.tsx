import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";

const PageHeader = () => {
  return (
    <section className="border-b border-neutral-400 p-8 flex flex-row justify-between bg-white">
      <div>
        <header className="text-2xl font-bold">Product Management</header>
        <span>Manage your store inventory</span>
      </div>

      <Link
        className="flex flex-row bg-violet-400 items-center gap-2 p-4 rounded-xl hover:bg-violet-800 hover:text-white transition-all"
        href="/products/create"
      >
        <Plus />
        Add Product
      </Link>
    </section>
  );
};

export default PageHeader;
