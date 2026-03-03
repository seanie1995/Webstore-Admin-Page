import React from "react";
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
      link: "",
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
      link: "",
    },
    {
      name: "Settings",
      Icon: Settings,
      link: "",
    },
  ];

  return (
    <div>
      <h2>Admin Page</h2>

      <div>
        <ul>
          {menuItems.map(({ name, Icon, link }) => (
            <li>
              <Link href={link} className="flex flex-row">
                <Icon />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
