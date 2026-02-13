import { Ref, type JSX } from "react";

export function Input({
  className="",
  placeholder,
  type,
  ref
}: {
  className?: string;
  type : string;
  placeholder : string;
  ref : Ref<HTMLInputElement>  ;
}): JSX.Element {
  return (
        <input type={type} ref={ref}  placeholder={placeholder} className={` bg-gray-200 text-black rounded-xl p-4 ${className}`} />
  );
}