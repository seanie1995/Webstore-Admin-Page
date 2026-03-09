"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Link from "next/link";

const PAGE_SIZE = 15;

const CustomerPagination = ({
  hasMore,
  totalCustomers,
}: {
  hasMore: boolean | null;
  totalCustomers: number;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentLimit = Number(searchParams.get("limit")) || PAGE_SIZE;

  const loadAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", totalCustomers.toString());

    return `${pathName}?${params.toString()}`;
  };

  const loadFirst = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", PAGE_SIZE.toString());

    return `${pathName}?${params.toString()}`;
  };

  const loadMore = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", (currentLimit + PAGE_SIZE).toString());

    return `${pathName}?${params.toString()}`;
  };

  const loadLess = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", (currentLimit - PAGE_SIZE).toString());

    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex gap-4 p-4  border-b border-l border-r border-neutral-200 rounded-b-xl justify-between">
      <span>
        Customers {currentLimit} of {totalCustomers}
      </span>
      <div className="flex gap-4">
        <Link
          scroll={false}
          href={loadFirst()}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all  ${currentLimit === PAGE_SIZE ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-purple-700 cursor-pointer"}  `}
        >
          {" "}
          First
        </Link>
        <Link
          scroll={false}
          href={loadLess()}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all  ${currentLimit === PAGE_SIZE ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-purple-700 cursor-pointer"}  `}
        >
          {" "}
          Less
        </Link>

        <Link
          scroll={false}
          href={loadMore()}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${!hasMore ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-purple-700 cursor-pointer"} `}
        >
          {" "}
          More
        </Link>
        <Link
          scroll={false}
          href={loadAll()}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${!hasMore ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-purple-700 cursor-pointer"} `}
        >
          {" "}
          All
        </Link>
      </div>
    </div>
  );
};

export default CustomerPagination;
