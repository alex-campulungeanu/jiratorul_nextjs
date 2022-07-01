import React from 'react'

import styles from './Gandalf.module.css'

const Gandalf = () => {
  return (
    <div>
      <div className={styles.gandalf}>
        <div className={styles.fireball}></div>
        <div className={styles.skirt}></div>
        <div className={styles.sleeves}></div>
        <div className={styles.shoulders}>
          <div className={`${styles.hand} ${styles.left}`}></div>
          <div className={`${styles.hand} ${styles.right}`}></div>
        </div>
        <div className={styles.head}>
          <div className={styles.hair}></div>
          <div className={styles.beard}></div>
        </div>
      </div>
    </div>
  )
}

export default Gandalf
