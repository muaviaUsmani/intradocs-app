import { ReactNode, HTMLAttributes } from "react"
import clsx from "clsx"


interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export default function DropdownItem({
  children,
  className,
  ...otherProps
}: DropdownItemProps) {
  return (
    <div className={clsx(["block text-sm px-4 py-2 cursor-pointer hover:bg-slate-800", className])} {...otherProps}>{children}</div>
  )
}
