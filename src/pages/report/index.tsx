import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

import styles from './index.module.css'
import GoBack from '@/components/GoBack'
import ReportForm from '@/components/forms/ReportForm'


const Report: NextPage = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <GoBack path='/'/>
        <ReportForm label='Add new report'/>        
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      roles: ['admin']
    }
  };
}

export default Report
