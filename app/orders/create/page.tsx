import CreateOrderForm from "@/components/order-form-components/create-order-form";
import { FetchAllProducts } from "@/lib/actions";
import { FetchAllCustomers } from "@/lib/customerActions";
import { CustomerOption, ProductOption } from "@/app/types";
const AddNewOrder = async () => {
  const [{ customers }, { products }] = await Promise.all([
    FetchAllCustomers(1000),
    FetchAllProducts(1000),
  ]);

  const customerOptions = customers.map((i) => {
    const data: CustomerOption = {
      id: i.id,
      name: `${i.firstName} ${i.lastName}`,
      email: i.email,
    };

    return data;
  });

  const productOptions = products.map((i) => {
    const data: ProductOption = {
      id: i.id.toString(),
      name: i.title,
    };

    return data;
  });

  return (
    <div>
      <CreateOrderForm customers={customerOptions} products={productOptions} />
    </div>
  );
};

export default AddNewOrder;
