"use client";

import { usePathname } from "next/navigation";
import {
  Package2,
  ChartSpline,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  const menuItems = [
    {
      name: "Products",
      Icon: Package2,
      link: "/products",
    },
    {
      name: "Analytics",
      Icon: ChartSpline,
      link: "",
    },
    {
      name: "Orders",
      Icon: ShoppingCart,
      link: "",
    },
    {
      name: "Customers",
      Icon: Users,
      link: "/customers",
    },
    {
      name: "Settings",
      Icon: Settings,
      link: "",
    },
  ];

  const pathname = usePathname();

  return (
    <div className=" flex flex-col gap-8 border-r border-neutral-400  h-full">
      <section className="border-b border-neutral-400 p-8">
        <h2 className="text-2xl font-bold">Admin Page</h2>
      </section>

      <section className="p-6 ">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex flex-row gap-6 rounded-xl transition-all p-2 ${
                  pathname === item.link ||
                  (pathname === "/" && item.link === "/products")
                    ? "bg-violet-800 text-white "
                    : "hover:bg-violet-400 hover:text-white"
                }`}
              >
                <item.Icon />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SideBar;
