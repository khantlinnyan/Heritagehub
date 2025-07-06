"use client";
import { House, User, MapIcon } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const menuItems = [
  {
    icon: House,
    label: "Home",
    href: "/",
  },
  // {
  //   icon: MapIcon,
  //   label: "Map",
  //   href: "/map",
  // },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
];
const BottomNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-3 shadow-2xs container mx-auto bg-neutral-50/80 backdrop-blur max-w-4xl">
      {menuItems.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.label}
            className="flex flex-col text-zinc-700 lg:flex-row items-center text-sm lg:text-xl gap-2"
          >
            <item.icon size={24} />
            <p className="">{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
