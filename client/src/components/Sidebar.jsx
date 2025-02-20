import React, { use } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth, { googleLogin, logOut } from "../lib/authentication";
import { MdLogout } from "react-icons/md";
import GoogleLogin from "./GoogleLogin";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, loading } = useAuth();

  const handleLogout = () => {
    logOut().then((result) => {
      toast.success("Logged Out");
    });
  };

  return (
    <div className="flex lg:flex-col h-full lg:justify-between w-full">
      <div className="flex items-center justify-between gap-10 lg:gap-0 lg:block">
        <Link to={"/"}>
          <h1 className="text-4xl font-black">ZenTask</h1>
        </Link>
        <div className="lg:mt-5 lg:space-y-5 flex items-center lg:flex-col gap-5 lg:gap-0">
          <Link
            to={"/"}
            className="md:flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center hidden"
          >
            <BsFillGrid1X2Fill />
            Dashboard
          </Link>
          {!user ? (
            <GoogleLogin />
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center"
            >
              <MdLogout />
              Log Out
            </button>
          )}
        </div>
      </div>

      <div className="">
        <p className="font-bold text-xl hidden lg:flex">
          Welcome {user?.displayName}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
