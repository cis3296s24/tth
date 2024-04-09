
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const Menu = ({
    setActive,
    children,
  }: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
  }) => {
    return (
      <nav
        onMouseLeave={() => setActive(null)} // resets the state
        className="fixed top-0 left-0 w-full bg-white dark:bg-black dark:border-white/[0.2] border-b border-transparent shadow-input flex justify-center space-x-4 px-8 py-6 z-50"
      >
        {children}
      </nav>
    );
  };