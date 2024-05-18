import Input from "@/components/Input"
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import styles from "./styles.module.scss"

export default function Search() {
  return (
    <div className={styles.root}>
      <Input 
        placeholder="Search" 
        containerClass={styles.input} 
        inputClass="bg-slate-900 focus:bg-slate-800 focus:border-slate-900 focus:ring-0" 
        icon={MagnifyingGlassIcon}
      />
    </div>
  )
}