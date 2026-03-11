import Form from "next/form";

import { Trash2 } from "lucide-react";
import { DeleteCustomer } from "@/lib/customerActions";

// Here we pass the formData along and get the id from that in the action
export function DeleteCustomerForm({ id }: { id: string }) {
  return (
    <Form action={DeleteCustomer}>
      <input hidden readOnly name="id" value={id} />
      <button className="hover:cursor-pointer" type="submit">
        <Trash2 className="text-red-600" />
      </button>
    </Form>
  );
}
