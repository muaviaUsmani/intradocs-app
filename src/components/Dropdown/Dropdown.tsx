import { ReactNode, useRef, useState } from "react"
import clsx from "clsx"
import { useOnClickOutside, useClickAnyWhere } from "usehooks-ts"

import styles from "./styles.module.scss"

interface DropdownProps {
  callToAction: ReactNode
  children: ReactNode
  containerClass?: string
  ctaClass?: string
  actionsClass?: string
}

export default function Dropdown({
  callToAction, 
  children,
  containerClass,
  ctaClass,
  actionsClass,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  
  useOnClickOutside<HTMLDivElement>(ref, () => setIsOpen(false))

  useClickAnyWhere(e => {
    const target = e?.target
    const isTargetNode = target && target instanceof Node
    const cta = document.getElementById("cta")
    if (isTargetNode) {
      if (!isOpen && cta?.contains(target)) {
        setIsOpen(true)
      } else if (ref.current?.contains(target)) {
        setIsOpen(false)
      }
    }
  })

  return (
    <div ref={ref} className={clsx(["relative", styles.root, containerClass])}>
      <span className={clsx([styles.cta, ctaClass])} id="cta">
        {callToAction}
      </span>
      <div className={clsx(["right-0 rounded-md drop-shadow-md bg-slate-700 overflow-hidden", styles.actions, actionsClass, isOpen ? 'absolute' : 'hidden'])}>
        {children}
      </div>
    </div>
  )
}
