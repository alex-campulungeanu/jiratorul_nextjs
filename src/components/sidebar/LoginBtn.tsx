import Link from 'next/link';
import React from 'react'
import {Button} from '@mantine/core'

import styles from './LoginBtn.module.css'

const LoginBtn = () => {
  return (
    <Link href="/login" passHref>
      <Button 
        color="blue" 
        className={styles.container} 
        component='a' 
      >
        Login
      </Button>
    </Link>
  )
}

export default LoginBtn
