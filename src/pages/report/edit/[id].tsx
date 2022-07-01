import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import ReportForm from '@/components/forms/ReportForm'
import styles from '../../report/index.module.css'
import GoBack from '@/components/GoBack'
import { getById } from '@/services/reportService'
import { ReportInterface } from '../[id]'
import LoadingIndicator from '@/components/Loader'

const ReportEdit = () => {
  const router = useRouter()
  const reportId = typeof router.query?.id === "string" ? router.query.id : "";
  const { isLoading, error, data, refetch } = useQuery(
    ['report', reportId], 
    () => getById(reportId),
    {
      enabled: reportId.length > 0
    }
  )
  const reportData: ReportInterface = data?.data

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <GoBack path='/'/>
        {isLoading ?
          <div style={{alignItems: 'center', justifyContent: 'center'}}>
            <LoadingIndicator />
          </div>
          :
          <ReportForm 
            label="Update report"
            data={reportData}
          />
        }
      </div>
    </div>
  )
}

export default ReportEdit
