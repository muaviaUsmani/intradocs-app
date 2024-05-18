import { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"

type Size = "small" | "base" | "large"

function getSizeClasses(size: Size) {
  switch (size) {
    case "small":
      return "px-2 py-1 text-sm rounded-sm"
    case "large":
      return "px-6 py-3 text-lg rounded-lg"
    case "base":
    default:
      return "px-4 py-2 text-base rounded"
  }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  size?: Size
}

export default function Button({
  children,
  className,
  type,
  size="base",
  ...otherProps
}: ButtonProps) {
  return (
    <button 
      type={type} 
      className={clsx(["bg-slate-950 shadow-2xl shadow-slate-800/50 hover:shadow-none active:shadow-none transition-shadow", getSizeClasses(size), className])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
