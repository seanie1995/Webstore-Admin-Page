import { FetchAllProducts, FetchSingleProductById } from "@/lib/actions";
import type { ProductsResponse } from "./types";
import ProductList from "@/components/product-list";

export default async function Home(params: PageProps<"/">) {
  return (
    <main>
      <div>
        <ProductList searchParams={params.searchParams} />
      </div>
    </main>
  );
}
