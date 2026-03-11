import { Customer } from "@/app/types";
import { SquarePen, Trash2 } from "lucide-react";
import { FetchAllCustomers, FetchCustomerCount } from "@/lib/customerActions";
import CustomerPagination from "./customers-filter-components/customer-pagination";
import CustomerSearchBar from "./customers-filter-components/customer-search";
import CustomerSortSelect from "./customers-filter-components/customer-category-sortBy";
import CustomerSortOrder from "./customers-filter-components/customer-sort-order";
import Link from "next/link";
import { DeleteCustomerForm } from "./customer-form-components/delete-customer-form";

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
    currentSearch,
  );

  const newLastId = res.lastId;

  const customerCount = await FetchCustomerCount();

  const { customers, lastId: nextLastId, hasMore } = await res;

  return (
    <section className="p-8">
      <div className="p-6 flex flex-row gap-4">
        <CustomerSearchBar />
        <CustomerSortSelect isCustomerList={true} />
        <CustomerSortOrder />
      </div>
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
                    {orderBy === "lastName" ? (
                      <span>
                        {customer.lastName}, {customer.firstName}
                      </span>
                    ) : (
                      <span>
                        {customer.firstName} {customer.lastName}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              <td className="text-center ">{customer.email}</td>
              <td className="text-center">{customer.phone}</td>
              <td className="text-center">{customer.address}</td>

              <td className="px-4">
                <div className="flex flex-row justify-end gap-4">
                  <Link href={`/customers/edit/${customer.id}`}>
                    <SquarePen className="text-purple-700" />
                  </Link>

                  <DeleteCustomerForm id={customer.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomerPagination
        hasMore={hasMore}
        total={customerCount}
        displayCount={customers.length}
      />
    </section>
  );
};

export default CustomerList;
