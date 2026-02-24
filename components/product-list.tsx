import React from "react";
import { Trash2, SquarePen } from "lucide-react";
import { FetchAllProducts } from "@/lib/actions";
import LimitSelector from "./filter-components/limit-select";
import Link from "next/link";

const ProductList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const {
    limit = "6",
    order = "asc",
    page = "1",
    orderBy = "id",
  } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);
  const currentOrder = Array.isArray(order) ? order[0] : order;
  const currentPage = Number(Array.isArray(page) ? page[0] : page);
  const currentSort = Array.isArray(orderBy) ? orderBy[0] : orderBy;

  const res = await FetchAllProducts(
    currentLimit,
    currentPage,
    currentSort,
    currentOrder,
  );

  const allProducts = res.products;

  return (
    <>
      <LimitSelector />
      <table className="w-full rounded-2xl  border-neutral-400 border">
        <thead className="bg-neutral-100">
          <tr className=" text-sm text-neutral-600">
            <th className="py-4 ">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id} className="border border-neutral-400  text-sm">
              <td className="text-left py-4 px-4">
                <div>
                  <div className="font-bold">{product.title}</div>
                  <div className=" text-gray-500">{product.id}</div>
                </div>
              </td>
              <td className="text-center ">{product.category?.name}</td>
              <td className="text-center">{product.price}</td>
              <td className="text-center">{product.availabilityStatus}</td>
              <td
                className={`text-center ${product.availabilityStatus === `In Stock` ? "text-green-600" : product.availabilityStatus === `Low Stock` ? `text-orange-600` : `text-red-700`}`}
              >
                {product.availabilityStatus}
              </td>
              <td className="px-4">
                <div className="flex flex-row justify-end gap-4">
                  <Link href={"/edit-page"}>
                    <SquarePen className="text-purple-700" />
                  </Link>

                  <Trash2 className="text-red-600" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
