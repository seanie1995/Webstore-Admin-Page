import { Order } from "@/app/types";
import { SquarePen, Trash2 } from "lucide-react";

import { FetchAllOrders } from "@/lib/orderActions";

const OrdersList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const {
    limit = "10",
    orderBy = "id",
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

  const res = await FetchAllOrders(
    currentLimit,
    currentOrderBy,
    currentOrder,
    currentLastId,
    currentSearch,
  );

  const newLastId = res.lastId;

  const { orders, lastId: nextLastId, hasMore } = await res;

  return (
    <section className="p-8">
      <div className="p-6 flex flex-row gap-4">
        {/*  <CustomerSearchBar />
        <CustomerSortSelect />
        <CustomerSortOrder /> */}
      </div>
      <table className="w-full rounded-lg overflow-hidden border-neutral-400 table-fixed bg-white ">
        <thead className="bg-neutral-200">
          <tr className=" text-sm text-neutral-600">
            <th className="py-4 w-[30%]">Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id} className="border border-neutral-200  text-sm">
              <td className="text-left py-4 px-4">
                <div>
                  <div className="font-bold">
                    <span>{order.id}</span>
                  </div>
                </div>
              </td>

              <td className="text-left py-4 px-4">
                <div>
                  <div className="font-bold">
                    {orderBy === "lastName" ? (
                      <span>
                        {order.customer?.lastName}, {order.customer?.firstName}
                      </span>
                    ) : (
                      <span>
                        {order.customer?.firstName} {order.customer?.lastName}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              <td className="text-center ">{order.customer?.email}</td>

              <td className="text-center">{order.status}</td>

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

export default OrdersList;
