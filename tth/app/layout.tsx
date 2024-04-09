"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { HoveredLink } from "../components/ui/HoveredLink";
import { ProductItem } from "../components/navbar/ProductItem";
import { Menu } from "../components/navbar/Menu";
import { MenuItem } from "../components/navbar/MenuItem";


import { cn } from "@/lib/util";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar className="top-2" />
        {children}
      </body>
    </html>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <HoveredLink href="/">Home</HoveredLink>
        <HoveredLink href="/feed">Feed</HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/create-listing">Create a Listing</HoveredLink>
            <HoveredLink href="/help">Help</HoveredLink>
            <HoveredLink href="/about">About</HoveredLink>
          </div>
        </MenuItem>
        <HoveredLink href="/profile">Profile</HoveredLink>
      </Menu>
    </div>
  );
}
