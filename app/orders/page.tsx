import React from "react";
import OrderHeader from "@/components/order-header";
import OrdersList from "@/components/orders-list";

const OrderPage = (params: PageProps<"/">) => {
  return (
    <main className="bg-gray-100">
      <OrderHeader />
      <section>
        <OrdersList searchParams={params.searchParams} />
      </section>
    </main>
  );
};

export default OrderPage;
