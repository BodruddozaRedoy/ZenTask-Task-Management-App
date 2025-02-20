import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 '>
            {/* sidebar  */}
            <div className='lg:col-span-2 md:col-span-4 w-full bg-gray-800 mb-5 lg:mb-0 lg:h-screen sticky overflow-auto text-white font-semibold p-5 md:p-10'>
                <Sidebar/>
            </div>
            <div className='lg:col-span-10 md:col-span-8 w-full lg:p-10'>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;