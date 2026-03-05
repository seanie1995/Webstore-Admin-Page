import { FetchAllCustomers } from "@/lib/customerActions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const limit = Number(searchParams.get("limit") ?? 6);
  const orderBy = searchParams.get("orderBy") ?? "lastName";
  const order = ((searchParams.get("order") ?? "asc") as "asc") || "desc";
  const lastId = searchParams.get("lastId") ?? undefined;
  const search = searchParams.get("search") ?? "";

  const result = await FetchAllCustomers(limit, orderBy, order, lastId);

  if (search) {
    const filtered = result.customers.filter(
      (c) =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()),
    );
    return NextResponse.json({
      customers: filtered,
      lastId: null,
      hasMore: false,
    });
  }
  return NextResponse.json(result);
}
