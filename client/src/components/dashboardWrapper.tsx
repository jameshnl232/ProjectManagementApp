"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
  import StoreProvider from "@/redux/redux";
  import { useAppSelector } from "@/redux/redux";
import { useEffect } from "react";
import clsx from "clsx";


function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);


    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />
      <main className={clsx("flex w-full flex-col bg-gray-50  text-gray-900 dark:bg-dark-bg", !isSidebarCollapsed && "pl-64")}>
        {/* Navbar */}
        <Navbar />

        {children}
      </main>
    </div>
  );
}

export default function DashBoardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
}
