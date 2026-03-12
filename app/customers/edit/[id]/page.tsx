import EditCustomerForm from "@/components/customer-form-components/edit-customer-form";
import { FetchCustomerById } from "@/lib/customerActions";

type EditPageProps = {
  params: {
    id: string;
  };
};

const EditCustomer = async ({ params }: EditPageProps) => {
  const today = new Date();
  const { id } = await params;
  const customer = await FetchCustomerById(id);
  const formattedDate = today.toLocaleDateString();

  return (
    <main className="p-8 h-full bg-gray-100">
      <header className="flex flex-row justify-between align-middle mb-8">
        <span className="text-4xl">Edit Customer</span>
        <span className="text-2xl">{formattedDate}</span>
      </header>
      <EditCustomerForm customer={customer} />
    </main>
  );
};

export default EditCustomer;
