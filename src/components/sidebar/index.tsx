import React from 'react'
import styles from './index.module.css'

import ExtraInfo from './ExtraInfo'
import LoggedIn from './LoggedIn'
import LoginBtn from './LoginBtn'
import AppCard from './AppCard'

import { useAuth } from '@/components/auth/AuthProvider'

const Sidebar = () => {
  const { user } = useAuth()
  return (
    <section className={`${styles.container} fade-in`}>
      <div className={styles.logginSection}>
        {user ? <LoggedIn /> : <LoginBtn />}
      </div>
      <AppCard />
      <ExtraInfo />
    </section>
  )
}

export default Sidebar