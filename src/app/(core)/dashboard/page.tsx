import Documents from "@/components/Documents"
import styles from "./styles.module.scss"

export default function Dashboard() {

  return (
    <div className={styles.root}>
      <Documents className="w-4/6 ml-5" />
    </div>
  )
}
