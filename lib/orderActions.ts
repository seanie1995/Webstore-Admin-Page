"use server";

import { adminDb } from "./firebaseAdmin";
import { Order, Customer, Product } from "@/app/types";
import { GetSession } from "./authActions";
import { FieldPath } from "firebase-admin/firestore";

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

export const FetchAllOrders = async (
  limit: number = 10,
  orderBy: string = "id",
  order: "asc" | "desc" = "asc",
  lastId: string | null,
  search?: string,
): Promise<{
  orders: Order[];
  lastId: string | null;
  hasMore: boolean;
}> => {
  const session = GetSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    let query = adminDb
      .collection("orders")
      .orderBy(
        orderBy === "id" ? FieldPath.documentId() : orderBy, // ✅
        order,
      )
      .limit(limit + 1);

    if (lastId) {
      const lastDoc = await adminDb.collection("orders").doc(lastId).get();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();

    const docs = snapshot.docs;

    const hasMore = docs.length > limit;

    let orders = docs
      .slice(0, limit)
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Order);

    if (search) {
      orders = orders.filter(
        (o) =>
          o.customer?.firstName.toLowerCase().includes(search.toLowerCase()) ||
          o.customer?.lastName.toLowerCase().includes(search.toLowerCase()) ||
          o.customer?.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    const lastVisible = orders.length > 0 ? orders[orders.length - 1].id : null;

    console.log(orders);

    return { orders, lastId: lastVisible, hasMore };
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};
