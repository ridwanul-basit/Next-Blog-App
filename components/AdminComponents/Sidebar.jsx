import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-52 border border-black h-screen bg-slate-300 text-white">
      {/* Logo Section */}
      <div className="px-2 sm:px-6 py-4 border-b border-black flex justify-center">
        <Image 
          src={assets.logo} 
          width={120} 
          alt="Logo" 
          priority 
          className="object-contain"
        />
      </div>

      {/* Example Navigation Section */}
      <div className="flex flex-col gap-4 p-4 mt-10">
        <Link href='/admin/addProduct' className="flex items-center gap-3 font-medium px-3 py-2 bg-white text-black rounded shadow-[-5px_5px_0px_#000]">
          <Image src={assets.add_icon} width={28} alt="Add Blog" />
          <p>Add Blog</p>
        </Link>

        <Link href='/admin/bloglist' className="flex mt-2  items-center gap-3 font-medium px-3 py-2 bg-white text-black rounded shadow-[-5px_5px_0px_#000]">
          <Image src={assets.blog_icon} width={28} alt="All Blogs" />
          <p>Blog List</p>
        </Link>
         <Link href='/admin/subscription' className="flex mt-2  items-center gap-3 font-medium px-3 py-2 bg-white text-black rounded shadow-[-5px_5px_0px_#000]">
          <Image src={assets.email_icon} width={28} alt="All Blogs" />
          <p>Subscription</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
