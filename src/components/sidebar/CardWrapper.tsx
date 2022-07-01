import React from 'react'

import styles from './CardWrapper.module.css'

const CardWrapper = ({children}: {children: React.ReactNode} ) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default CardWrapper
