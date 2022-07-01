import type { NextPage } from 'next'
import React from 'react'

import styles from '../styles/Home.module.css'
import Sidebar from '../components/sidebar'
import Main from '../components/main'
import { RoleTypeEnum } from '@/enums/role-type-enum'

const Home: NextPage = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.home}> 
          <div className={styles.side}>
            <Sidebar />
          </div>
          <Main />
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      roles: [RoleTypeEnum.DEVELOPER, RoleTypeEnum.ADMIN, RoleTypeEnum.BOSS ]
    }
  };
}

// Home.requireAuth = true

export default Home
