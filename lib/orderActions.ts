import { adminDb } from "./firebaseAdmin";
import { Order, Customer, Product } from "@/app/types";
import { GetSession } from "./authActions";

export const CreateNewOrder = async (
  order: Omit<Order, "id">,
): Promise<Order> => {
  try {
    const session = GetSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const docRef = await adminDb.collection("orders").add(order);

    return {
      id: docRef.id,
      ...order,
    };
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};
