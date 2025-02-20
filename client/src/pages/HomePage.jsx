import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../lib/authentication";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import axiosInstance from "../lib/axiosInstance";

// const todos = [
//   {
//     _id: 1,
//     title: "hello buddy",
//     description: "nobody will gonna care you",
//     date: "10/11/2024",
//   },
//   {
//     _id: 1,
//     title: "hello buddy",
//     description: "nobody will gonna care you",
//     date: "10/11/2024",
//   },
//   {
//     _id: 1,
//     title: "hello buddy",
//     description: "nobody will gonna care you",
//     date: "10/11/2024",
//   },
// ];

const HomePage = () => {
  const { user, loading } = useAuth();
  console.log(user);

  const {data:todos=[]} = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
        const res = await axiosInstance.get("/users")
        console.log(res.data);
        return res.data
        
    }
  })

  const toDo = [...todos]?.filter(prev => prev.category === "to-do")
  const inProgress = [...todos]?.filter(prev => prev.category === "in-progress")
  const completed = [...todos]?.filter(prev => prev.category === "completed")
  return (
    <div className="p-5 lg:p-10 rounded-xl bg-gray-800 text-white">
      {/* header  */}
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Todo</h1>
        <div className="flex items-center gap-3">
          <Link to={"/add-task"}>
            <button className="py-3 px-5 bg-white rounded-xl text-black font-semibold cursor-pointer select-none">
              Add Task
            </button>
          </Link>
          <div className="">
            <img
              className="w-12 h-12 rounded-full border-2 overflow-hidden"
              src={user?.photoURL}
              alt=""
            />
          </div>
        </div>
      </section>

      {/* middle body  */}
      <section>
        <div></div>
      </section>

      {/* main body */}
      <section className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-10">
        {/* to start */}
        <div className="flex flex-col gap-5 ">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-400"></span>To start
          </div>
          <div className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-full overflow-y-scroll">
            {toDo?.map((todo, index) => (
              <div key={todo._id} className="bg-white p-5 rounded-xl text-black">
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <p className="text-gray-400">{todo.description}</p>
                <hr className="text-gray-400 my-3" />
                <p className="text-gray-400 text-sm">{todo.date}</p>
              </div>
            ))}
          </div>
        </div>
        {/* in progress  */}
        <div className="flex flex-col gap-5 ">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-500"></span>In
            Progress
          </div>
          <div className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-full overflow-auto">
            {inProgress?.map((todo, index) => (
              <div className="bg-white p-5 rounded-xl text-black">
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <p className="text-gray-400">{todo.description}</p>
                <hr className="text-gray-400 my-3" />
                <p className="text-gray-400 text-sm">{todo.date}</p>
              </div>
            ))}
          </div>
        </div>
        {/* completed */}
        <div className="flex flex-col gap-5 ">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>Completed
          </div>
          <div className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-full overflow-auto">
            {completed?.map((todo, index) => (
              <div className="bg-white p-5 rounded-xl text-black">
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <p className="text-gray-400">{todo.description}</p>
                <hr className="text-gray-400 my-3" />
                <p className="text-gray-400 text-sm">{todo.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
