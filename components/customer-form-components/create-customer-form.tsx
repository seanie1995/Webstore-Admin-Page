"use client";
import { CreateNewCustomer } from "@/lib/customerActions";
import { useRouter } from "next/navigation";

const CreateCustomerForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const customer = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
      };
      await CreateNewCustomer(customer);
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

export default CreateCustomerForm;
