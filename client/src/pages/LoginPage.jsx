import React from "react";
import useAuth, { googleLogin } from "../lib/authentication";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
    const { user, loading } = useAuth();

    const handleGoogle = () => {
      googleLogin().then((result) => {
        console.log(result);
      });
    };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-gray-800 space-y-5 text-white rounded-xl p-10">
      <p className="text-4xl font-bold">Welcome to ZenTask..</p>
      <p>Please Login to begin with</p>
      <p
        onClick={handleGoogle}
        className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl cursor-pointer active:scale-95 select-none transition-all w-full justify-center"
      >
        <FaGoogle />
        Google
      </p>
      </div>
    </div>
  );
};

export default LoginPage;
