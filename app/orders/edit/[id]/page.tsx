import { FetchAllProducts } from "@/lib/actions";
import { ProductOption } from "@/app/types";
import EditOrderForm from "@/components/order-form-components/edit-order-form";
import { FetchOrderById } from "@/lib/orderActions";
import { Timestamp } from "firebase/firestore";

type EditPageProps = {
  params: {
    id: string;
  };
};
const EditOrder = async ({ params }: EditPageProps) => {
  const { id } = await params;
  const products = await FetchAllProducts(1000);

  const order = await FetchOrderById(id);

  const productOptions = products.products.map((i) => {
    const data: ProductOption = {
      id: i.id.toString(),
      name: i.title,
      price: i.price,
    };

    return data;
  });

  const day = new Date(order.orderDate);

  const formattedDate = day.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="p-8">
      <header className="flex flex-row justify-between align-middle">
        <span className="text-4xl">Order #: {order.id}</span>
        <span className="text-2xl ">Order Date: {formattedDate}</span>
      </header>
      <EditOrderForm products={productOptions} order={order} />
    </main>
  );
};

export default EditOrder;
