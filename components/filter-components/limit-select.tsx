"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LimitSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const limit = searchParams.get("limit") || "6";
  const ITEM_LIMITS = ["6", "10", "12"];

  const handleLimitSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", newLimit);
    params.set("page", "1");

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <form className="flex items-center gap-2 p-6">
      <label
        htmlFor="limit-select"
        className="text-sm font-medium text-gray-700"
      >
        Items per page:
      </label>
      <select
        name="limit"
        id="limit-select"
        defaultValue={limit}
        onChange={handleLimitSelect}
        className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        {ITEM_LIMITS.map((i) => (
          <option key={`limit-select-${i}`} value={i}>
            {i}
          </option>
        ))}
      </select>
    </form>
  );
};

export default LimitSelector;
