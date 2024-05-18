import clsx from "clsx"
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Dropdown, { DropdownItem } from "@/components/Dropdown"
import useAuth from "@/utilities/hooks/useAuth"
import Search from "@/components/Search"

import styles from "./styles.module.scss"

export default function Header() {
  const { logout } = useAuth()
  return (
    <header className={clsx(["py-4 px-5 bg-slate-950", styles.root])}>
      <div className="flex items-center">
        <h3 className="text-lg mr-4">Intradocs</h3>
        <Search />
      </div>
      <Dropdown 
        callToAction={<UserCircleIcon className="size-6 cursor-pointer" />}
      >
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </Dropdown>
    </header>
  )
}
