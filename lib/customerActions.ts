"use server";
import { adminDb } from "./firebaseAdmin";
import { Customer } from "@/app/types";

const FetchAllCustomers = async (): Promise<Customer[]> => {
  try {
    const snapshot = await adminDb.collection("customers").get();

    const customers: Customer[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone ?? undefined,
        address: data.address,
      };
    });

    return customers;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw new Error("Failed to fetch customers");
  }
};

const CreateNewCustomer = async (
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
    throw new Error("Failed to create customer");
  }
};
