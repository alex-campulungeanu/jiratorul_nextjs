import Link from 'next/link';
import React from 'react'
import { BiChevronLeft } from 'react-icons/bi';

import styles from './GoBack.module.css'

const GoBack = ({path}: {path: string}) => {
  return (
    <div className={styles.alert}>
      <div className={styles.back}>
        <Link href={`${path}`} passHref>
          <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
            <BiChevronLeft />
            <p>Go back</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default GoBack
