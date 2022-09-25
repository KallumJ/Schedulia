import { MdAccountBox } from "react-icons/md"
import styles from "../styles/components/NavBar.module.scss"
import Link from "next/link"

export default function NavBar() {
    return (
        <nav className={styles.container}>
            <span>
                <Link href="/"><a><h1 className={`${styles.header} ${styles.link}`}>Schedulia</h1></a></Link>
                <Link href="/credits"><a><p className={`${styles.sublink} ${styles.link}`}>Credits</p></a></Link>
            </span>
            <Link href="/account"><a><MdAccountBox size={"2em"} className={styles.link} /></a></Link>
        </nav>
    )
}
