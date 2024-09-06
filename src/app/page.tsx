"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Blackboard from './components/Blackboard'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.code}>
        <p>Frontend Engineer Take Home Project</p>
        <p>by <a href="https://github.com/aUlloaN">Anthony Ulloa</a></p>
      </div>
      
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/classkick.png"
          alt="Classkick Logo"
          width={200}
          height={50}
          priority
        />
      </div>

      <br></br><br></br>
      <h3>Blackboard</h3>
      <br></br><br></br>
      <Blackboard />
    </main>
  )
}
