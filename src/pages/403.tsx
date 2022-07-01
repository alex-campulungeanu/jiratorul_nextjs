import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

import Gandalf from '@/components/Gandalf'
import styles from '@/styles/403.module.css'

const Custom403 = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Gandalf />
      <div className={styles.message}>
        <h1>403 - You Shall Not Pass</h1>
        <br />
        <p>
          Uh oh, Gandalf is blocking the way!
          <br/>
          {router.query.reason} Or you meant to go to a different location? Like...
          <Link href='/login'>
            <b style={{cursor: 'pointer'}}>Hobbiton?</b>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Custom403
