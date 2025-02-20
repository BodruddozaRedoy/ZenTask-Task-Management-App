import React from "react";
import useAuth, { googleLogin } from "../lib/authentication";
import GoogleLogin from "../components/GoogleLogin";

const LoginPage = () => {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-gray-800 space-y-5 text-white rounded-xl p-10">
        <p className="text-4xl font-bold">Welcome to ZenTask..</p>
        <p>Please Login to begin with</p>
        <GoogleLogin/>
      </div>
    </div>
  );
};

export default LoginPage;
