import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../lib/authentication";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { ImBin } from "react-icons/im";
import toast from "react-hot-toast";

const Home = () => {
  const { user } = useAuth();

  // Fetch tasks from database
  const { data: todos = [], refetch, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tasks/${user.email}`);
      return res.data;
    },
  });

  // State for task organization
  const [tasks, setTasks] = useState({ "to-do": [], "in-progress": [], completed: [] });
  const [draggedTask, setDraggedTask] = useState(null);

  // Sync local state with API data
  useEffect(() => {
    setTasks({
      "to-do": todos.filter((task) => task.category === "to-do"),
      "in-progress": todos.filter((task) => task.category === "in-progress"),
      completed: todos.filter((task) => task.category === "completed"),
    });
  }, [todos]);

  // Handle Drag Start
  const handleDragStart = (event, task, category) => {
    setDraggedTask({ ...task, category });
  };

  // Allow Drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle Drop (Update Order & Category)
  const handleDrop = async (event, newCategory) => {
    event.preventDefault();
    if (!draggedTask) return;

    const oldCategory = draggedTask.category;
    let updatedTasks = { ...tasks };

    // Remove task from old category
    updatedTasks[oldCategory] = updatedTasks[oldCategory].filter((task) => task._id !== draggedTask._id);

    // Add task to new category
    const updatedTask = { ...draggedTask, category: newCategory };
    updatedTasks[newCategory] = [...updatedTasks[newCategory], updatedTask];

    setTasks(updatedTasks);
    setDraggedTask(null);

    // Update category in the database
    await axiosInstance.patch(`/drag-tasks/${draggedTask._id}`, { category: newCategory });

    // Refresh data from the backend
    refetch();
  };

  // Handle Reorder within the same category
  const handleDragEnd = async (event, newIndex, category) => {
    event.preventDefault();
    if (!draggedTask) return;

    let updatedCategoryTasks = [...tasks[category]];
    const oldIndex = updatedCategoryTasks.findIndex((task) => task._id === draggedTask._id);

    // Remove and reinsert at new index
    const [movedTask] = updatedCategoryTasks.splice(oldIndex, 1);
    updatedCategoryTasks.splice(newIndex, 0, movedTask);

    // Update local state
    setTasks((prev) => ({ ...prev, [category]: updatedCategoryTasks }));

    // Update the backend to reflect new order (optional: send full list to backend)
    await axiosInstance.patch(`/tasks/${draggedTask._id}`, { category });

    setDraggedTask(null);
    refetch();
  };

  // Delete task
  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/tasks/${id}`);
    if (res.data.acknowledged) {
      refetch();
      toast.success("Task Deleted");
    }
  };

  return (
    <div className="p-5 lg:p-10 rounded-xl bg-gray-800 text-white h-full overflow-hidden">
      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Todo</h1>
        <div className="flex items-center gap-3">
          <Link to={"/add-task"}>
            <button className="py-3 px-5 bg-white rounded-xl text-black font-semibold">
              Add Task
            </button>
          </Link>
          <div className="w-12 h-12 rounded-full border-2 overflow-hidden flex items-center justify-center">
            {user ? <img className="w-full h-full object-cover" src={user?.photoURL} alt="" /> : <IoPersonCircleOutline className="text-[150px]" />}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 items-start h-full">
        {["to-do", "in-progress", "completed"].map((category) => (
          <div key={category} className="flex flex-col gap-5">
            <div className="text-xl font-bold flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full ${category === "to-do" ? "bg-red-400" : category === "in-progress" ? "bg-yellow-500" : "bg-green-500"}`}
              ></span>
              {category === "to-do" ? "To Start" : category === "in-progress" ? "In Progress" : "Completed"}
            </div>

            <div
              className="flex flex-col gap-5 bg-slate-200 p-5 rounded-xl h-[610px] overflow-y-auto"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, category)}
            >
              {tasks[category]?.length < 1 && (
                <div className="text-black font-bold flex items-center justify-center">No Task</div>
              )}
              {isLoading && <img className="w-10 h-10 mx-auto animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" />}

              {tasks[category]?.map((task, index) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, task, category)}
                  onDragEnd={(event) => handleDragEnd(event, index, category)}
                  className="bg-white p-5 rounded-xl text-black cursor-grab"
                >
                  <h1 className="text-xl font-bold">{task.title}</h1>
                  <p className="text-gray-400">{task.description}</p>
                  <hr className="text-gray-400 my-3" />
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{task.timeStamps}</p>
                    <div className="flex gap-3 items-center">
                      <Link to={`/update-task/${task._id}`} state={{ task }}>
                        <LiaEdit className="text-2xl text-blue-500 cursor-pointer" />
                      </Link>
                      <ImBin onClick={() => handleDelete(task._id)} className="text-xl text-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
