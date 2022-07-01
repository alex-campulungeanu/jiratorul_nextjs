import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Button, Group, TextInput, Drawer, Divider, Badge, Text, Modal } from '@mantine/core'
import { useForm } from '@mantine/form'
import { toast } from 'react-toastify'
import { FiRefreshCcw } from "react-icons/fi";
import { useQueryClient } from 'react-query'

import GoBack from '@/components/GoBack'
import { getById } from '@/services/reportService'
import styles from './id.module.css'
import Header from '@/components/Header'
import UserDetailsForm from '@/components/sprint/UserDetailsForm'
import SprintDetailsForm from '@/components/sprint/SprintDetailsForm'
import Loader from '@/components/Loader'
import UserAvatar from '@/components/UserAvatar'
import { populateReport } from '@/services/reportService'
import { getMonthByNumber } from '@/utils/date'
import { RoleTypeEnum } from '@/enums/role-type-enum'
import { StatusTypeEnum } from '@/enums/status-type-enum'
import { useAuth } from '@/components/auth/AuthProvider'

interface IssueInterface {
  id: number,
  name: string,
  summary: string,
  points: number,
  userId: number,
  url: string,
  issueType: {
      id: number,
      name: string
  }
}

export interface UserSprintInterface {
  id: number;
  name: string;
  email: string;
  vacationDays: number;
  feedbackWeeks: number;
  completed: boolean;
  roles: string[]
}

export interface SprintInterface {
  id: number;
  name: string;
  url: string;
  startDate: string;
  endDate: string;
  bankHolidays: string;
  users: UserSprintInterface[];
  issues: IssueInterface[]
}

export interface ReportInterface {
  id: number;
  month: number;
  year: number;
  description: string;
  status: {
    name: string
  };
  sprints: SprintInterface[];

}

const Report = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const reportId = typeof router.query?.id === "string" ? router.query.id : "";
  const { user } = useAuth()
  const [currentSprintUser, setCurrentSprintUser] = useState<{userId: number, sprintId: number}>({userId: -1, sprintId: -1})
  const [currentSprint, setCurrentSprint] = useState<number>(-1)
  const { isLoading, error, data, refetch } = useQuery(
    ['report', reportId], 
    () => getById(reportId),
    {
      enabled: reportId.length > 0
    }
  )
  const report: ReportInterface = data?.data
  
  const populateReportForm = useForm({
    initialValues: {
      jiraSessionId: '',
    },
    validate: {
      jiraSessionId: (value: string | undefined) => {
        return value ? null : 'Session cookie must be filled'
      },
    },
  });

  const populateReportMutation = useMutation(populateReport, {
    onSuccess: data => {
      toast(`Report populated with JIRA data`)
      queryClient.invalidateQueries('report')
      refetch()
      populateReportForm.reset()
    },
    onError: (error: any) => {
      console.log(error);
      if (error.status == 400 ){
        populateReportForm.setFieldError('jiraSessionId', error.data)
      } else {
        toast.error('Unable to populate the report!')
      }
    }
  });

  const userCanAddDetails = (userEmail: string, roles: string[]): boolean | undefined => {
    if (user.roles.includes(RoleTypeEnum.ADMIN)) {
      return true
    } else if (user.email == userEmail) {
      return true
    } else {
      return false
    }
  }

  const handleSubmitFetchDetails = () => {
    const data = {...populateReportForm.values, reportId: reportId}
    populateReportMutation.mutate(data)
  }

  const handleUserDrawerState = (userId: number, sprintId: number) => {
    setCurrentSprintUser({sprintId: sprintId, userId: userId})
  }
  
  const handleSprintDetailsModalState = (sprintId: number) => {
    setCurrentSprint(sprintId)
  }

  const handleSaveUserDrawer = () => {
    handleUserDrawerState(-1, -1)
    refetch()
  }

  const handleSaveSprintDetailsModal= () => {
    handleSprintDetailsModalState(-1)
    refetch()
  }

  if (isLoading || !report) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )
  }

  // TODO: put the Drawer outside the loop if possible
  return (
    <main className={styles.layout}>
      <GoBack path='/'/>
      <Header showAdd={false} name={`${getMonthByNumber(report.month)} ${report.year}`}/>
      <div className={styles.reportDetails}>
        <form onSubmit={populateReportForm.onSubmit(handleSubmitFetchDetails)}>
          <Group align='end'>
            <TextInput
              label="JIRA session id"
              placeholder='JIRA session id'
              width={'30%'}
              style={{width: '70%'}}
              disabled={!user.roles.includes(RoleTypeEnum.ADMIN)}
              {...populateReportForm.getInputProps('jiraSessionId')}
            />
            <Button
              color="blue"
              type="submit"
              leftIcon={<FiRefreshCcw size={24}/>}
              loading={populateReportMutation.isLoading}
              disabled={!user.roles.includes(RoleTypeEnum.ADMIN)}
            >
              Get JIRA data
            </Button>
          </Group>
        </form>
      </div>
      {
        report && report.sprints.map(sprint => (
          <div className={styles.sprintDetails} key={sprint.id}>
            <div className={styles.sprintHeader}>
              <div>
                <div style={{'display': 'flex'}}>
                  <a href={sprint.url} target={"_blank"} rel={"noreferrer"} style={{'textDecoration': 'none'}}>
                    <h3 style={{'color': '#3a4374'}}>{report.status.name == StatusTypeEnum.NEW ? sprint.url : sprint.name}</h3>
                  </a>
                </div>
                <div>{sprint.startDate} - {sprint.endDate}</div>
              </div>
              <Button 
                onClick={() => handleSprintDetailsModalState(sprint.id)}
                disabled={!user.roles.includes(RoleTypeEnum.ADMIN)}
              >
                Update sprint details  
              </Button >
            </div>
            <Divider sx={{marginTop: 10}}/>
            {sprint.users.map(user => {
              return (
                <div key={user.id}>
                  <div className={styles.userDetails}>
                    <Group>
                      <UserAvatar name={user.name}/>
                      <Text size='lg' >{user.name}</Text> 
                      <Badge size="lg" radius="lg" color={user.completed ? 'teal' : 'red'} >
                        {user.completed ? 'COMPLETAT' : 'INCA NU A COMPLETAT'}
                      </Badge>
                    </Group>
                    <Button 
                      onClick={() => handleUserDrawerState(user.id, sprint.id)}
                      disabled={!userCanAddDetails(user.email, user.roles)}
                    >
                      Add user details
                    </Button>
                  </div>
                  <Drawer
                    opened={user.id === currentSprintUser.userId && sprint.id === currentSprintUser.sprintId ? true : false}
                    onClose={() => handleUserDrawerState(-1, -1)}
                    title={`Update ${user.name} details`}
                    padding="xl"
                    size="40%"
                  >
                    <UserDetailsForm 
                      sprint={sprint} 
                      user={user} 
                      onSave={() => handleSaveUserDrawer()}
                      onCancel={() => handleUserDrawerState(-1, -1)}
                    />
                  </Drawer>
                </div>
              )
            })}
            <Modal
              opened={sprint.id === currentSprint ? true: false}
              onClose={() => handleSprintDetailsModalState(-1)}
              title="Update sprint details !"
            >
              <SprintDetailsForm 
                sprint={sprint} 
                onSave={() => handleSaveSprintDetailsModal()} 
                onCancel={() => handleSprintDetailsModalState(-1)}
              />
            </Modal>
          </div>
        )
      )}
    </main>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      roles: [RoleTypeEnum.DEVELOPER, RoleTypeEnum.ADMIN]
    }
  };
}

export async function getStaticPaths() {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export default Report
