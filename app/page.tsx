import { FetchAllProducts, FetchSingleProductById } from "@/lib/actions";
import type { ProductsResponse } from "./types";
import ProductList from "@/components/product-list";
import SideBar from "@/components/sidebar";
import PageHeader from "@/components/products-header";

export default async function Home(params: PageProps<"/">) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome Admin</h1>
    </main>
  );
}
