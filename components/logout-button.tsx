"use client";
import { useRouter } from "next/navigation";
import { Logout } from "@/lib/authActions";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    await Logout();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="hover:cursor-pointer transition-all flex flex-row gap-6 p-2 hover:text-red-600 "
    >
      <LogOut className={`text-red-600  hover:cursor-pointer transition-all`} />
      Logout
    </button>
  );
};

export default LogoutButton;
