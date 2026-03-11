import Form from "next/form";
import { DeleteOrder } from "@/lib/orderActions";
import { Trash2 } from "lucide-react";

// Here we pass the formData along and get the id from that in the action
export function DeleteOrderForm({ id }: { id: string }) {
  return (
    <Form action={DeleteOrder}>
      <input hidden readOnly name="id" value={id} />
      <button className="hover:cursor-pointer" type="submit">
        <Trash2 className="text-red-600" />
      </button>
    </Form>
  );
}
