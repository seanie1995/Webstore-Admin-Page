"use server";
import { adminDb } from "./firebaseAdmin";
import { Customer } from "@/app/types";
import { GetSession } from "./authActions";
import { collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const FetchAllCustomers = async (
  limit: number = 10,
  orderBy: string = "lastName",
  order: "asc" | "desc" = "asc",
  lastId?: string,
  search?: string,
): Promise<{
  customers: Customer[];
  lastId: string | null;
  hasMore: boolean;
}> => {
  try {
    const session = GetSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    let query = adminDb
      .collection("customers")
      .orderBy(orderBy === "" ? "lastName" : orderBy, order)
      .limit(limit + 1);

    if (lastId) {
      const lastDoc = await adminDb.collection("customers").doc(lastId).get();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const docs = snapshot.docs;

    const hasMore = docs.length > limit;

    let customers = docs
      .slice(0, limit)
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Customer);

    if (search) {
      customers = customers.filter(
        (c) =>
          c.firstName.toLowerCase().includes(search.toLowerCase()) ||
          c.lastName.toLowerCase().includes(search.toLowerCase()),
      );
    }

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
    const session = GetSession();

    if (!session) {
      throw new Error("Unauthorized");
    }
    const doc = await adminDb.collection("customers").doc(id).get();

    if (!doc.exists) {
      throw new Error("Customer not found");
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    throw error;
  }
};

export const DeleteCustomer = async (formData: FormData) => {
  try {
    const session = GetSession();

    const id = formData.get("id") as string;

    if (!session) {
      throw new Error("Unauthorized");
    }
    await adminDb.collection("customers").doc(id).delete();
    revalidatePath("");
  } catch (error) {
    console.error("Failed to delete customer:", error);
    throw error;
  }
};

export const CreateNewCustomer = async (
  customer: Omit<Customer, "id">,
): Promise<Customer> => {
  try {
    const session = GetSession();

    if (!session) {
      throw new Error("Unauthorized");
    }
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

export const FetchCustomerCount = async () => {
  const snapshot = await adminDb.collection("customers").count().get();

  const total = snapshot.data().count;

  return total;
};

export const EditCustomer = async (
  id: string,
  customer: Omit<Customer, "id">,
): Promise<Customer> => {
  try {
    const session = GetSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    await adminDb.collection("customers").doc(id).update(customer);

    return {
      id,
      ...customer,
    };
  } catch (error) {
    console.error("Error editing customer", error);
    throw error;
  }
};
