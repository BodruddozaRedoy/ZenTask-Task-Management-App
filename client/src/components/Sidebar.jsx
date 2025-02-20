import React from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-black">ZenTask</h1>
      <div className="mt-5">
      <p className="flex items-center gap-3 py-3 px-5 bg-gray-700 rounded-xl">
        <BsFillGrid1X2Fill />
        Dashboard
      </p>
      </div>
    </div>
  );
};

export default Sidebar;
