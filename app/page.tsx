import { FetchAllProducts, FetchSingleProductById } from "@/lib/actions";
import type { ProductsResponse } from "./types";
import ProductList from "@/components/product-list";
import SideBar from "@/components/sidebar";
import PageHeader from "@/components/page-header";

export default async function Home(params: PageProps<"/">) {
  return (
    <main>
      <PageHeader />
      <ProductList searchParams={params.searchParams} />
    </main>
  );
}
