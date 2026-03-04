import PageHeader from "@/components/page-header";
import ProductList from "@/components/product-list";
import SideBar from "@/components/sidebar";
import React from "react";

const Products = (params: PageProps<"/">) => {
  return (
    <main className="">
      <PageHeader />
      <section>
        <ProductList searchParams={params.searchParams} />
      </section>
    </main>
  );
};

export default Products;
