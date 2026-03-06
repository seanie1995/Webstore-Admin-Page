"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";

const CustomerPagination = ({ lastId }: { lastId: string | null }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (lastId === null) {
      return `${pathName}?${params.toString()}`;
    }

    params.set("lastId", lastId.toString());

    return `${pathName}?${params.toString()}`;
  };

  const returnToFirstUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("lastId");

    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex gap-4 p-4  border-b border-l border-r border-neutral-200 rounded-b-xl justify-end">
      <div className="flex gap-4">
        <Link
          scroll={false}
          href={returnToFirstUrl()}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all `}
        >
          {" "}
          First
        </Link>
        <Link
          scroll={false}
          href={createPageUrl()}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all `}
        >
          {" "}
          More
        </Link>
      </div>
    </div>
  );
};

export default CustomerPagination;
