"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary";
  onclick: () => void;
  logo?: ReactNode;
}

const primaryStyle = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition-colors duration-300';

const secondaryStyle = 'bg-gray-800  text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300';

export const Button = ({ children, className = "", onclick, type, logo }: ButtonProps) => {
  const style = type === "secondary" ? secondaryStyle : primaryStyle;
  return (
    <button className={`${style} ${className}`} onClick={onclick}>
      {children}{logo && <span className="ml-2">{logo}</span>}
    </button>
  );
};
