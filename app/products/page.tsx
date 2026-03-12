import CreateForm from "@/components/product-form-components/create-form";
import PageHeader from "@/components/products-header";
import ProductList from "@/components/product-list";
import SideBar from "@/components/sidebar";
import React from "react";

const Products = (params: PageProps<"/">) => {
  return (
    <main className="bg-gray-100">
      <PageHeader />
      <section>
        <ProductList searchParams={params.searchParams} />
      </section>
    </main>
  );
};

export default Products;
