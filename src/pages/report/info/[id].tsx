import React, { useState } from 'react'
import { NextPage } from 'next'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { BiMessageSquareDetail, BiInfoCircle } from 'react-icons/bi'
import { Tabs } from '@mantine/core'

import GoBack from '@/components/GoBack'
import Header from '@/components/Header'
import styles from './id.module.css'
import { getInfoById } from '@/services/reportService'
import LoaderComponent from '@/components/Loader'
import SummaryTab from '@/components/info/SummaryTab'
import DetailsTab from '@/components/info/DetailsTab'
import { useAuth } from '@/components/auth/AuthProvider'
import { userHasRoles } from '@/utils/auth'
import { RoleTypeEnum } from '@/enums/role-type-enum'
import { StatusTypeEnum } from '@/enums/status-type-enum'
import { getMonthByNumber } from '@/utils/date'

interface IssueInterface {
  id: number,
  points: number,
  name: string,
  summary: string,
  issueType: {
    name: string,
  },
  user: {
    id: number,
    email: string
  }
}

interface UserInterface {
  user: {
    id: number,
    email: string,
  },
  feedbackWeeks: number,
  vacationDays: number
}

export interface SprintInterface {
  id: number,
  bankHolidays: number,
  name: string,
  sprintDays: number,
  users: UserInterface[],
  issues: IssueInterface[],
  startDate: string,
  endDate: string,
}

export interface ReportInfoInterface {
  id: number,
  month: number;
  year: number;
  status: {
    name: string
  };
  sprints: SprintInterface[]
}

const Info: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth()
  const reportId = typeof router.query?.id === "string" ? router.query.id : "";
  const [activeTab, setActiveTab] = useState(0);
  const { isLoading, error, data, refetch } = useQuery(
    ['reportInfo', reportId], 
    () => getInfoById(reportId),
    {
      enabled: reportId.length > 0
    }
  )
  const info: ReportInfoInterface = data?.data

  const onChangeTab = (active: number, tabKey: string) => {
    setActiveTab(active);
  };

  const tabs = [
    {
      key: 'summary',
      label: 'Summary',
      icon: <BiInfoCircle size={20} />,
      content: <SummaryTab info={info}/>,
      active: true,
      color: 'teal'
    },
    {
      key: 'details',
      label: 'Details',
      icon: <BiMessageSquareDetail size={20} />,
      content: <DetailsTab info={info}/>,
      active: userHasRoles([RoleTypeEnum.ADMIN, RoleTypeEnum.DEVELOPER], user)  && info?.status?.name !== StatusTypeEnum.NEW,
      color: 'pink'
    }
  ]

  if (isLoading || !info) {
    return (
      <div className={styles.loader}>
        <LoaderComponent />
      </div>
    )
  }

  return (
    <main className={styles.layout}>
      <GoBack path='/'/>
      <Header name={`${getMonthByNumber(info.month)} ${info.year}`}/>
      <br />
      <Tabs 
        grow active={activeTab} 
        onTabChange={onChangeTab} 
        // variant='default'
        styles={(theme) => ({
          tabControl: {
            // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
            // border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
            fontSize: theme.fontSizes.lg,
            padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  
            // '&:not(:first-of-type)': {
            //   borderLeft: 0,
            // },
  
            // '&:first-of-type': {
            //   borderTopLeftRadius: theme.radius.md,
            //   borderBottomLeftRadius: theme.radius.md,
            // },
  
            // '&:last-of-type': {
            //   borderTopRightRadius: theme.radius.md,
            //   borderBottomRightRadius: theme.radius.md,
            // },
          },
          // TODO: here i can use the main color theme
          // tabActive: {
          //   backgroundColor: 'rgb(230, 73, 128)',
          //   borderColor: 'rgb(230, 73, 128)',
          //   color: theme.white,
          // },
        })}
      >
        {tabs.map(tab => {
          if (tab.active) {
            return (
              <Tabs.Tab label={tab.label} tabKey={tab.key} icon={tab.icon} key={tab.key} color={tab.color}>
                <div style={{marginTop: '20px'}}>
                  {tab.content}
                </div>
              </Tabs.Tab>
            )
          }
        })}
      </Tabs>
    </main>
  )
}

export default Info
