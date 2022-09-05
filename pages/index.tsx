import type { NextPage } from 'next'
import Schedule from '../components/schedule/Schedule'
import styles from "../styles/pages/Home.module.scss"

const Home: NextPage = () => {
  return (
    <div className={styles.masterpage}>
      <Schedule />
    </div>
  )
}

export default Home
