import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const ProductItem = ({
    title,
    description,
    href,
    src,
  }: {
    title: string;
    description: string;
    href: string;
    src: string;
  }) => {
    return (
      <Link href={href} className="flex space-x-2">
        <Image
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        />
        <div>
          <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
            {title}
          </h4>
          <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
            {description}
          </p>
        </div>
      </Link>
    );
  };