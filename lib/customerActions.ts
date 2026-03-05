"use server";
import { adminDb } from "./firebaseAdmin";
import { Customer } from "@/app/types";

export const FetchAllCustomers = async (
  limit: number = 16,
  orderBy: string = "lastName",
  order: "asc" | "desc" = "asc",
  lastId?: string,
): Promise<{
  customers: Customer[];
  lastId: string | null;
  hasMore: boolean;
}> => {
  try {
    let query = adminDb
      .collection("customers")
      .orderBy(orderBy, order)
      .limit(limit + 1);

    if (lastId) {
      const lastDoc = await adminDb.collection("customers").doc(lastId).get();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const docs = snapshot.docs;

    const hasMore = docs.length > limit;

    const customers = docs
      .slice(0, limit)
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Customer);

    const lastVisible =
      customers.length > 0 ? customers[customers.length - 1].id : null;
    return { customers, lastId: lastVisible, hasMore };
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

export const FetchCustomerById = async (id: string): Promise<Customer> => {
  try {
    const doc = await adminDb.collection("customers").doc(id).get();

    if (!doc.exists) {
      throw new Error("Customer not found");
    }

    return { id: doc.id, ...doc.data() } as Customer;
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    throw error;
  }
};

export const DeleteCustomer = async (id: string): Promise<void> => {
  try {
    await adminDb.collection("customers").doc(id).delete();
  } catch (error) {
    console.error("Failed to delete customer:", error);
    throw error;
  }
};

export const CreateNewCustomer = async (
  customer: Omit<Customer, "id">,
): Promise<Customer> => {
  try {
    const docRef = await adminDb.collection("customers").add(customer);

    return {
      id: docRef.id,
      ...customer,
    };
  } catch (error) {
    console.error("Error creating customer", error);
    throw error;
  }
};
