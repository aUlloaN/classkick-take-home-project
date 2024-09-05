"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Blackboard from './components/Blackboard'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.code}>
        <p>Frontend Engineer Take Home Project</p>
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
      <h3>Mock &nbsp;</h3>
      <div className={styles.center}>
        <Image
          src="/classkick-take-home.png"
          alt="Classkick Take Home"
          width={450}
          height={350}
          priority
        />
      </div>

      <br></br><br></br>
      <h3>Blackboard &nbsp;</h3>
      <Blackboard />
    </main>
  )
}
