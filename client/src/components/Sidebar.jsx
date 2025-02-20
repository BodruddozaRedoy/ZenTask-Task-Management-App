import React from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth, { googleLogin, logOut } from "../lib/authentication";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  const { user, loading } = useAuth();

  const handleGoogle = () => {
    googleLogin().then((result) => {
      console.log(result);
    });
  };

  const handleLogout = () => {
    logOut()
    .then((result) => {
      alert("logout")
    })
  }
  
  return (
    <div className="">
      <h1 className="text-4xl font-black">ZenTask</h1>
      <div className="mt-5 space-y-5">
        <Link
          to={"/"}
          className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center"
        >
          <BsFillGrid1X2Fill />
          Dashboard
        </Link>
        {!user ? (
          <p
            onClick={handleGoogle}
            className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center"
          >
            <FaGoogle />
            Google
          </p>
        ) : (
          <button onClick={handleLogout} className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center">
            <MdLogout />
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
