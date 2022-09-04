import { MdAccountBox } from "react-icons/md"
import styles from "../../styles/components/NavBar.module.scss"
import Link from "next/link"

export default function NavBar() {
    return (
        <nav className={styles.container}>
            <Link href="/"><a><h1 className={styles.header}>Schedulia</h1></a></Link>
            <Link href="/account"><a><MdAccountBox size={"2em"} className={styles.account_button} /></a></Link>
        </nav>
    )
}
