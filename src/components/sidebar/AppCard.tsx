import React from 'react'

import styles from './AppCard.module.css'

const AppCard = () => {
  return (
    <div className={styles.background}>
      <div  className={styles.content}>
        <h2>JIRA report</h2>
        <p>pace, bucurie si bere la cutie !</p>
      </div>
    </div>
  )
}

export default AppCard
