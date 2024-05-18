import { ComponentType, InputHTMLAttributes, SVGProps } from "react"
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string
  inputClass?: string
  error?: string
  touched?: boolean
  fieldSize?: Size
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  iconClass?: string
}

export default function Input({
  containerClass,
  inputClass,
  error,
  touched,
  fieldSize="base",
  icon: Icon,
  iconClass,
  ...otherProps
}: InputProps) {
  return (
    <div className={clsx(["relative", containerClass])}>
      <input 
        className={clsx(["w-full bg-slate-800 focus:bg-slate-700 border-slate-900", getSizeClasses(fieldSize), inputClass])} 
        {...otherProps}
      />
      {touched && error && (
        <span>{error}</span>
      )}
      {Icon && <Icon className={clsx(["absolute right-3 top-2 w-6 text-slate-600", iconClass])} />}
    </div>
  )
}
