"use client";

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CustomerSortSelect = ({
  isCustomerList,
}: {
  isCustomerList: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const CreateSearchURL = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set("orderBy", e.target.value);

    const url = `${pathName}?${params.toString()}`;

    router.push(url);
  };

  const customerSortBy = [
    { title: "firstName", text: "First Name" },
    { title: "lastName", text: "Last Name" },
    { title: "email", text: "Email" },
    { title: "address", text: "Address" },
  ];

  const orderSortBy = [
    { title: "customer.firstName", text: "First Name" },
    { title: "customer.lastName", text: "Last Name" },
    { title: "customer.email", text: "Email" },
    { title: "id", text: "Order Id" },
  ];

  const displaySortBy = isCustomerList ? customerSortBy : orderSortBy;

  return (
    <select
      className="p-2 rounded-lg bg-neutral-200"
      onChange={CreateSearchURL}
      defaultValue={""}
    >
      <option value={""} disabled>
        Order By
      </option>
      {displaySortBy.map((i, index) => (
        <option value={i.title} key={index}>
          {i.text}
        </option>
      ))}
    </select>
  );
};

export default CustomerSortSelect;
