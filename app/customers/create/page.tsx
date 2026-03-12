"use client";

import CreateCustomerForm from "@/components/customer-form-components/create-customer-form";

const CreateCustomer = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString();
  return (
    <main className="p-8">
      <header className="flex flex-row justify-between align-middle mb-8">
        <span className="text-4xl">Create Customer</span>
        <span className="text-2xl ">{formattedDate}</span>
      </header>
      <CreateCustomerForm />
    </main>
  );
};

export default CreateCustomer;
