import React from "react";

const LogoutButton = () => {
  const handleClick = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
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
