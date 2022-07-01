import React from 'react'
import { useQuery } from 'react-query'

import { getReports } from '@/services/reportService'
import LoadingIndicator from '@/components/Loader'
import styles from './ReportList.module.css'
import ReportItem from '@/components/main/ReportItem'

interface ReportListProps{
  showUpdate: boolean;
  showEdit: boolean;
}

const ReportList = ({showUpdate, showEdit}: ReportListProps) => {
  const { isLoading, error, data } = useQuery('reportList', getReports)
  const reportList = data?.data

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <>
      {
        reportList && reportList.map((item: any, idx: number) => 
          (
            <ReportItem data={item} key={idx} showUpdate={showUpdate} showEdit={showEdit}/>
          ))
      }
    </>
  )
}

export default ReportList
