import styles from "../styles/pages/Credits.module.scss"
import Image from "next/image"

export default function Credits() {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Credits</h1>
            <div className={styles.credits}>
                <div className={styles.section}>
                    <div>
                        <h1>Film and TV Data</h1>
                        <p>Film and TV Show data is provided by the <a href="https://www.themoviedb.org/" target="_blank">TMDB</a> api.</p>
                        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                    </div>
                    <Image src="/logos/tmdb_logo.svg" alt="Logo for TMDB" className={styles.logo} width="0" height="200" />
                </div>
                <div className={styles.section}>
                    <div>
                        <h1>Video Game Data</h1>
                        <p>Video game data is provided by the <a href="https://rawg.io/" target="_blank">RAWG</a> api.</p>
                        <p>This product uses the RAWG API but is not endorsed or certified by RAWG.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
