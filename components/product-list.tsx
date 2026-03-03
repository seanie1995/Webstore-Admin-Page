import React from "react";
import { Trash2, SquarePen } from "lucide-react";
import { FetchAllCategories, FetchAllProducts } from "@/lib/actions";
import LimitSelector from "./filter-components/limit-select";
import Pagination from "./filter-components/pagination";
import Link from "next/link";
import CategorySelect from "./filter-components/category-select";
import SearchBar from "./filter-components/search-bar";

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
    title_like = "",
    categoryId = "",
  } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);
  const currentOrder = Array.isArray(order) ? order[0] : order;
  const currentPage = Number(Array.isArray(page) ? page[0] : page);
  const currentSort = Array.isArray(orderBy) ? orderBy[0] : orderBy;
  const currentQuery = Array.isArray(title_like) ? title_like[0] : title_like;
  const chosenCategory = Array.isArray(categoryId) ? categoryId[0] : categoryId;

  const res = await FetchAllProducts(
    currentLimit,
    currentPage,
    currentSort,
    currentOrder,
    currentQuery,
    chosenCategory,
  );

  const categories = await FetchAllCategories();

  const allProducts = res.products;
  const totalPages = res.pages;

  return (
    <>
      <div className="p-6 flex flex-row gap-4">
        <LimitSelector />
        <SearchBar />
        <CategorySelect categories={categories} />
      </div>

      <table className="w-full rounded-lg overflow-hidden border-neutral-400 ">
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
            <tr key={product.id} className="border border-neutral-200  text-sm">
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
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default ProductList;
