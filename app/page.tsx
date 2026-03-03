import { FetchAllProducts, FetchSingleProductById } from "@/lib/actions";
import type { ProductsResponse } from "./types";
import ProductList from "@/components/product-list";
import SideBar from "@/components/sidebar";

export default async function Home(params: PageProps<"/">) {
  return (
    <main className="grid grid-cols-2">
      <section>
        <SideBar />
      </section>
      <section>
        <ProductList searchParams={params.searchParams} />
      </section>
    </main>
  );
}
