import React from "react";
import { googleLogin } from "../lib/authentication";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const GoogleLogin = () => {
  const handleGoogle = () => {
    googleLogin().then((result) => {
    //   console.log(result.user);
      const user = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
    //   console.log(user);
      axiosInstance.post("/users", user).then((result) => {
            toast.success("Logged in successfully");
      });
      //   if (res.data.insertedId) {
      //     toast.success("Logged in successfully");
      //   }
    });
  };
  return (
    <p
      onClick={handleGoogle}
      className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center"
    >
      <FaGoogle />
      Google
    </p>
  );
};

export default GoogleLogin;
