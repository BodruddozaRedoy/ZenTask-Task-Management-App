import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../lib/authentication";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { ImBin } from "react-icons/im";
import {DndContext} from '@dnd-kit/core';
import toast from "react-hot-toast";


const HomePage = () => {
  const { user, loading } = useAuth();
  const [column, setColumn] = useState({
    
  })

  const { data: todos = [], refetch, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tasks/${user.email}`);
      return res.data;
    },
  });

  

  const toDo = [...todos]?.filter((prev) => prev.category === "to-do");
  const inProgress = [...todos]?.filter(
    (prev) => prev.category === "in-progress"
  );
  const completed = [...todos]?.filter((prev) => prev.category === "completed");

//   delete todo 
const handleDelete = async(id) => {
    const res = await axiosInstance.delete(`/tasks/${id}`)
    if(res.data.acknowledged){
        refetch()
        toast.success("Task Deleted")
    }
}
  return (
    <div className="p-5 lg:p-10 rounded-xl bg-gray-800 text-white h-full overflow-hidden">
      {/* header  */}
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Todo</h1>
        <div className="flex items-center gap-3">
          <Link to={"/add-task"}>
            <button className="py-3 px-5 bg-white rounded-xl text-black font-semibold cursor-pointer select-none">
              Add Task
            </button>
          </Link>
          <div className="w-12 h-12 rounded-full border-2 overflow-hidden flex items-center justify-center">
            {user ? (
              <img
                className="w-full h-full object-cover"
                src={user?.photoURL}
                alt=""
              />
            ) : (
              <IoPersonCircleOutline className="text-[150px]" />
            )}
          </div>
        </div>
      </section>

      {/* middle body  */}
      {/* <section>
        <div></div>
      </section> */}

      {/* main body */}
      <section className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 items-start h-full">
        {/* to start */}
        <div className="flex flex-col gap-5">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-400"></span>To start
          </div>

          <div className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-[610px] overflow-y-auto">
            {toDo?.length < 1 && (
              <div className="text-black font-bold flex items-center justify-center">
                No Task to Start
              </div>
            )}
            {isLoading && <img class="w-10 h-10 mx-auto animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon"></img>}
            {toDo?.map((todo, index) => (
              <div
                key={todo._id}
                draggable
                className="bg-white p-5 rounded-xl text-black"
              >
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <p className="text-gray-400">{todo.description}</p>
                <hr className="text-gray-400 my-3" />
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">{todo.timeStamps}</p>
                  <div className="flex gap-3 items-center">
                  <Link to={`/update-task/${todo._id}`} state={{todo}}><LiaEdit className="text-2xl text-blue-500 cursor-pointer" /></Link>
                  <ImBin onClick={() => handleDelete(todo._id)} className="text-xl text-red-500 cursor-pointer"/>
                  </div>
                </div>
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
          <div className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-[610px] overflow-y-auto">
            {inProgress?.length < 1 && (
              <div className="text-black font-bold flex items-center justify-center">
                No Task in Progress
              </div>
            )}
            {isLoading && <img class="w-10 h-10 mx-auto animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon"></img>}
            {inProgress?.map((todo, index) => (
              <div key={index} draggable className="bg-white p-5 rounded-xl text-black">
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <p className="text-gray-400">{todo.description}</p>
                <hr className="text-gray-400 my-3" />
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">{todo.timeStamps}</p>
                  <div className="flex gap-3 items-center">
                  <Link to={`/update-task/${todo._id}`} state={{todo}}><LiaEdit className="text-2xl text-blue-500 cursor-pointer" /></Link>
                  <ImBin onClick={() => handleDelete(todo._id)} className="text-xl text-red-500 cursor-pointer"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* completed */}
        <div className="flex flex-col gap-5 ">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>Completed
          </div>
          <div className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-[610px] overflow-y-auto">
            {completed?.length < 1 && (
              <div className="text-black font-bold flex items-center justify-center">
                No Task Completed
              </div>
            )}
            {isLoading && <img class="w-10 h-10 mx-auto animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon"></img>}
            {completed?.map((todo, index) => (
              <div key={index} draggable className="bg-white p-5 rounded-xl text-black">
                <h1 className="text-xl font-bold">{todo.title}</h1>
                <p className="text-gray-400">{todo.description}</p>
                <hr className="text-gray-400 my-3" />
                <p className="text-gray-400 text-sm">{todo.timeStamps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
