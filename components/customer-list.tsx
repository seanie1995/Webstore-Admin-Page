import { NEXT_PUBLIC_BASE_URL } from "@/lib/config";
import { Customer } from "@/app/types";
import { SquarePen, Trash2 } from "lucide-react";
import { FetchAllCustomers } from "@/lib/customerActions";

const CustomerList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const {
    limit = "10",
    orderBy = "lastName",
    order = "asc",
    lastId = "",
    search = "",
  } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);
  const currentOrderBy = Array.isArray(orderBy) ? orderBy[0] : orderBy;
  const currentOrder =
    (Array.isArray(order) ? order[0] : order) === "desc" ? "desc" : "asc";
  const currentLastId = Array.isArray(lastId) ? lastId[0] : lastId;
  const currentSearch = Array.isArray(search) ? search[0] : search;

  const res = await FetchAllCustomers(
    currentLimit,
    currentOrderBy,
    currentOrder,
    currentLastId,
  );

  const { customers, lastId: nextLastId, hasMore } = await res;
  return (
    <section className="p-8">
      {" "}
      <table className="w-full rounded-lg overflow-hidden border-neutral-400 table-fixed bg-white ">
        <thead className="bg-neutral-200">
          <tr className=" text-sm text-neutral-600">
            <th className="py-4 w-[30%]">Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: Customer) => (
            <tr
              key={customer.id}
              className="border border-neutral-200  text-sm"
            >
              <td className="text-left py-4 px-4">
                <div>
                  <div className="font-bold">
                    {customer.firstName} {customer.lastName}
                  </div>
                </div>
              </td>
              <td className="text-center ">{customer.email}</td>
              <td className="text-center">{customer.phone}</td>
              <td className="text-center">{customer.address}</td>

              <td className="px-4">
                <div className="flex flex-row justify-end gap-4">
                  <SquarePen className="text-purple-700" />
                  <Trash2 className="text-red-600" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CustomerList;
