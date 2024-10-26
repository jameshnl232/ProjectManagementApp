"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, X } from "lucide-react";
import { Home, Briefcase, Search, Settings, User, Users } from "lucide-react";
import { setSidebarCollapsed } from "@/state";
import { ChevronUp, ChevronDown } from "lucide-react";
import { AlertCircle, ShieldAlert, AlertTriangle, AlertOctagon, Layers3 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { RootState } from "@/redux/redux";
import { useGetProjectsQuery } from "@/state/api";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";

type Props = {};

export default function Sidebar({}: Props) {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriorities, setShowPriorities] = useState(true);
  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state: RootState) => state.global.isSidebarCollapsed);

  const {data: projects} = useGetProjectsQuery();

  const sidebarClassNames = ` fixed flex flex-col h-[100vh] justify-between shadow-xl transition-all duration-300 ease-in-out bg-white dark:bg-dark-secondary 
    overflow-y-scroll  ${isCollapsed ? "w-0 hidden" : "w-64"}
    `;

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
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start dark:border-r-[0.1px] dark:border-gray-600 dark:bg-dark-bg">
        {/* Logo */}
        <div className="z-50 flex min-h-[56px] w-full items-center justify-start gap-3 border-gray-200 px-6 py-3 pt-3">
          <Image
            src="/Projectee.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-xl"
          />
          <div className="text-xl font-bold tracking-wide text-gray-800 dark:text-white">
            PROJECTEE
          </div>

          {!isCollapsed && (
            <button
              onClick={() => dispatch(setSidebarCollapsed(!isCollapsed))}
              className="py-3"
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Dashboard" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          {/*           <SidebarLink icon={Settings} label="Settings" href="/settings" />
           */}{" "}
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>

        {/*Projects  */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/*Projects Lists */}
        {showProjects &&
          projects &&
          projects.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

        {/*Priorities */}
        <button
          onClick={() => setShowPriorities((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriorities ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/*Priorities Lists */}
        {showPriorities && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
      <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
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
            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

type SidebarItemProps = {
  label: string;
  icon: LucideIcon;
  href: string;
};

const SidebarLink = ({ label, icon: Icon, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};
