import { Search, Sun, Moon, Settings, Menu, User } from "lucide-react";
import { setDarkMode, setSidebarCollapsed } from "@/state";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { RootState } from "@/redux/redux";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector(
    (state: RootState) => state.global.isDarkMode,
  );

  const { data: currentUser } = useGetAuthUserQuery({});

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

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
          className="h-8 w-full rounded-md bg-gray-300 pl-10 pr-2 text-gray-900 placeholder-gray-600 focus:outline-slate-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-100"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(setDarkMode(!isDarkMode))}
          aria-label="Toggle theme"
          className="rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          {isDarkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className="rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <Settings className="h-5 w-5" />
        </button>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://pm-images-s3.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
