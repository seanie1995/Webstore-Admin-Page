"use client";
import { useRouter } from "next/navigation";
import { Logout } from "@/lib/authActions";

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
      className=" hover:bg-red-800 hover:cursor-pointer transition-all bg-red-600 w-1/4 py-2 text-white rounded-xl mx-auto"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
