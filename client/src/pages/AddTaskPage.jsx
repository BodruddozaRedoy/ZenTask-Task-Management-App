import React from 'react'
import axiosInstance from '../lib/axiosInstance'

const AddTaskPage = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const description = form.description.value
        const category = form.category.value
        const timeStamps = (new Date()).toDateString()
        console.log(title, description, category, timeStamps);
        try {
            const res = await axiosInstance.post("/users", {title, description, category, timeStamps})
            console.log(res.data);

        } catch (error) {
            console.log(error);
            
        }
        
        
    }
  return (
    <form onSubmit={handleSubmit} className='p-5 lg:p-10 lg:m-10 rounded-xl bg-gray-800 text-white space-y-5'>
        <div className='flex flex-col gap-4'>
            <p className='text-xl font-bold'>Title</p>
            <input required type="text" name="title" id="" placeholder='Type here' className='py-3 px-5 bg-white text-black rounded-xl'/>
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-xl font-bold'>Description</p>
            <input required type="text" name="description" id="" placeholder='Type here' className='py-3 px-5 bg-white text-black rounded-xl'/>
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-xl font-bold'>Category</p>
            <select required name="category" id="" className='py-3 px-5 bg-white text-black rounded-xl'>
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
            </select>
        </div>
        <button type='submit' className='py-3 px-5 bg-white rounded-xl text-black cursor-pointer font-bold active:scale-95 select-none transition-all'>Add Task</button>
    </form>
  )
}

export default AddTaskPage