import React from "react";
import CustomerList from "@/components/customer-list";
import CustomerHeader from "@/components/customers-header";

const Customers = (params: PageProps<"/">) => {
  return (
    <main>
      <CustomerHeader />
      <section>
        <CustomerList searchParams={params.searchParams} />
      </section>
    </main>
  );
};

export default Customers;
