import { Search, Sun, Moon, Settings, Menu } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../redux";
import { setDarkMode, setSidebarCollapsed } from "@/state";

export default function Navbar() {

  const dispatch = useAppDispatch();
   const isSidebarCollapsed = useAppSelector(
     (state) => state.global.isSidebarCollapsed,
   );
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);


  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-3 dark:bg-dark-secondary dark:text-white">
      {/* Collapse Button */}
      {!isSidebarCollapsed ? null : (
        <button
          onClick={() => dispatch(setSidebarCollapsed(!isSidebarCollapsed))}
        >
          <Menu className="h-8 w-8 dark:text-white" />
        </button>
      )}

      {/* Search */}
      <div className="relative flex h-min w-[200px] items-center gap-2">
        <label
          htmlFor="search"
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <Search className="h-5 w-5 text-gray-900 dark:text-white" />
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search"
          className="h-8 w-full rounded-md bg-gray-300 pl-10 pr-2  text-gray-900 placeholder-gray-600 focus:outline-slate-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-100"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(setDarkMode(!isDarkMode))}
          aria-label="Toggle theme"
          className="rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
            {isDarkMode ? <Moon className=" h-5 w-5 " /> : <Sun className=" h-5 w-5 " />}
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className="rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
