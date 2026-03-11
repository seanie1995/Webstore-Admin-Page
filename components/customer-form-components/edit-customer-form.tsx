"use client";
import { Customer } from "@/app/types";
import { EditCustomer } from "@/lib/customerActions";
import { useRouter } from "next/navigation";

interface EditCustomerFormProps {
  customer: Customer;
}

const EditCustomerForm = ({ customer }: EditCustomerFormProps) => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const updatedCustomer = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
      };
      await EditCustomer(customer.id, updatedCustomer);
      router.push("/customers");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-6 border border-neutral-400 p-8 rounded-xl"
    >
      {/* First Name */}
      <input type="hidden" name="id" value={customer.id} />
      <section className="flex flex-col gap-2">
        <label className="font-semibold text-lg" htmlFor="firstName">
          First Name
        </label>
        <input
          className="border rounded-lg px-2 py-2"
          type="text"
          id="firstName"
          name="firstName"
          minLength={2}
          maxLength={50}
          required
          defaultValue={customer.firstName}
        />
      </section>

      {/* Last Name */}
      <section className="flex flex-col gap-2">
        <label className="font-semibold text-lg" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="border rounded-lg px-2 py-2"
          type="text"
          id="lastName"
          name="lastName"
          minLength={2}
          maxLength={50}
          required
          defaultValue={customer.lastName}
        />
      </section>

      {/* Email */}
      <section className="flex flex-col gap-2">
        <label className="font-semibold text-lg" htmlFor="email">
          Email
        </label>
        <input
          className="border rounded-lg px-2 py-2"
          type="email"
          id="email"
          name="email"
          required
          defaultValue={customer.email}
        />
      </section>

      {/* Phone */}
      <section className="flex flex-col gap-2">
        <label className="font-semibold text-lg" htmlFor="phone">
          Phone
        </label>
        <input
          className="border rounded-lg px-2 py-2"
          type="tel"
          id="phone"
          name="phone"
          defaultValue={customer.phone || ""}
        />
      </section>

      {/* Address */}
      <section className="flex flex-col gap-2">
        <label className="font-semibold text-lg" htmlFor="address">
          Address
        </label>
        <textarea
          className="border rounded-lg px-2 py-2"
          id="address"
          name="address"
          minLength={5}
          maxLength={200}
          required
          defaultValue={customer.address}
        />
      </section>

      {/* Buttons */}
      <div className="flex flex-row justify-evenly mt-4">
        <button
          type="submit"
          className="text-black w-1/3 bg-green-400 py-2 rounded-lg hover:bg-green-600 transition-all hover:cursor-pointer"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="text-black w-1/3 bg-red-400 py-2 rounded-lg hover:bg-red-600 transition-all hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
