import React from 'react'

import styles from './index.module.css'
import Header from '@/components/Header'
import ReportList from './ReportList'
import { useAuth } from '@/components/auth/AuthProvider'
import { userHasRoles } from '@/utils/auth'
import { RoleTypeEnum } from '@/enums/role-type-enum'

const Index = (): JSX.Element  => {
  const { user } = useAuth()
  const showAddReport = userHasRoles([RoleTypeEnum.ADMIN], user)
  const showEditReport = userHasRoles([RoleTypeEnum.ADMIN], user)
  const showUpdateReport = userHasRoles([RoleTypeEnum.DEVELOPER], user)
  
  return (
    // TODO: check if showUpdate and showEdit should be at the ReportItem level, not ReportList level
    <div className={styles.main}>
      <div className={styles.container}>
        <Header showAdd={showAddReport}/>
        <ReportList 
          showUpdate={showUpdateReport}
          showEdit={showEditReport}
        />
      </div>
    </div>
  )
}

export default Index
