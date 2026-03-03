import ProductList from "@/components/product-list";
import SideBar from "@/components/sidebar";
import React from "react";

const Products = (params: PageProps<"/">) => {
  return (
    <main className="">
      <section>
        <ProductList searchParams={params.searchParams} />
      </section>
    </main>
  );
};

export default Products;
