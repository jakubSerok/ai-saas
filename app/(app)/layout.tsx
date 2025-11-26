"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navbar */}
        <header className="sticky top-0 z-40 w-full bg-slate-800 shadow-md border-b border-slate-700">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1">
              <Link href="/" onClick={handleLogoClick}>
                <div className="btn btn-ghost normal-case text-xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-500">
                  VideoSaaS
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center space-x-2 sm:space-x-4">
              {user && (
                <>
                  <div className="avatar placeholder">
                    <div className="bg-primary text-white rounded-full w-10">
                      <img
                        src={user.imageUrl}
                        alt={
                          user.username || user.emailAddresses[0].emailAddress
                        }
                      />
                    </div>
                  </div>
                  <span className="text-sm truncate max-w-xs lg:max-w-md hidden sm:inline text-white">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle hover:bg-error/20"
                    title="Sign out"
                  >
                    <LogOutIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-grow">{children}</main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-gradient-to-b from-slate-800 to-slate-900 w-64 h-full flex flex-col shadow-xl border-r border-slate-700">
          <div className="flex items-center justify-center py-6 border-b border-slate-700">
            <ImageIcon className="w-8 h-8 text-blue-400 mr-2" />
            <span className="text-lg font-bold text-white">VideoSaaS</span>
          </div>
          <ul className="menu p-4 w-full text-slate-300 flex-grow space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                    pathname === item.href
                      ? "bg-blue-600 text-white font-semibold shadow-md"
                      : "hover:bg-slate-700 text-slate-300"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user && (
            <div className="p-4 border-t border-slate-700 space-y-3">
              <div className="text-xs text-slate-400 truncate">
                {user.username || user.emailAddresses[0].emailAddress}
              </div>
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-error w-full btn-sm"
              >
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
