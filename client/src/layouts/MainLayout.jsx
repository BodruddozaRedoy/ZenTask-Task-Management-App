import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='grid grid-cols-12 '>
            {/* sidebar  */}
            <div className='col-span-2 w-full bg-gray-800 h-screen overflow-auto text-white font-semibold p-10'>
                <Sidebar/>
            </div>
            <div className='col-span-10 w-full lg:p-10'>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;