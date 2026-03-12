"use client";

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CustomerSortOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const CreateSearchURL = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set("order", e.target.value);

    const url = `${pathName}?${params.toString()}`;

    router.push(url);
  };

  const sortBy = [
    { title: "asc", text: "Ascending" },
    { title: "desc", text: "Descending" },
  ];

  return (
    <select
      className="p-2 rounded-lg bg-neutral-200"
      onChange={CreateSearchURL}
      defaultValue={""}
    >
      <option value={"asc"} disabled>
        Sort Order
      </option>
      {sortBy.map((i, index) => (
        <option value={i.title} key={index}>
          {i.text}
        </option>
      ))}
    </select>
  );
};

export default CustomerSortOrder;
