import type { JSX } from "react";

import { Home, Search, Send, Settings, Database, LogOut } from "lucide-react";

export type SidebarIconProps = {
  icon: JSX.Element;
  tooltip: string;
};

export default function Sidebar() {
  return (
    <div className="h-screen w-16 bg-gray-900 text-white flex flex-col justify-between py-4 shadow-lg">
      <div className="flex flex-col items-center space-y-6">
        <SidebarIcon icon={<Home size={20} />} tooltip="Home" />
        <SidebarIcon icon={<Search size={20} />} tooltip="Search" />
        <SidebarIcon icon={<Send size={20} />} tooltip="Requests" />
        <SidebarIcon icon={<Database size={20} />} tooltip="Collections" />
      </div>

      <div className="flex flex-col items-center space-y-6">
        <SidebarIcon icon={<Settings size={20} />} tooltip="Settings" />
        <SidebarIcon icon={<LogOut size={20} />} tooltip="Logout" />
      </div>
    </div>
  );
}

function SidebarIcon({ icon, tooltip }: SidebarIconProps) {
  return (
    <div className="group relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-800 text-white hover:bg-blue-600 rounded-lg transition-all duration-200 cursor-pointer">
      {icon}
      <span className="absolute left-14 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-200 pointer-events-none">
        {tooltip}
      </span>
    </div>
  );
}
