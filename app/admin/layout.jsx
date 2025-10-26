import { assets } from "@/Assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <ToastContainer theme="dark"/>
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full h-[70px] border-b border-black px-4">
          <h3 className="font-medium">Admin Panel</h3>
          <Image src={assets.profile_icon} width={40} height={40} alt="Profile" />
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-slate-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
