import React from 'react'
import { format } from 'date-fns'

import { ReportInfoInterface } from '@/pages/report/info/[id]'
import { IssueTypeEnum } from '@/enums/issue-type-enum'
import styles from './DetailsTab.module.css'
import DetailCard from '@/components/info/DetailCard'
import { SprintInterface } from '@/pages/report/info/[id]'
import CardWrapper from '@/components/info/CardWrapper'

interface SummaryProps  {
  info: ReportInfoInterface
}


// TODO: should refactor this, don't be LAZY !!!!
// TODO: create separate function for every type: getVacationDaysPerSprint, getFeedbackWeeksPerSprint etc...
const DetailsTab = ({info }: SummaryProps) => {

  const getSprintDetailsContent = (sprint: SprintInterface) => {
    return (
      <>
        <div>{sprint.startDate && format(Date.parse(sprint.startDate), 'dd/LLL/yyyy')} - {sprint.endDate && format(Date.parse(sprint.endDate), 'dd/LLL/yyyy')}</div>
      </>
    )
  }
  
  const getVacationDaysContent = (sprint: SprintInterface) => {
    return (
      <>
        {sprint.users.map(user => {
          return (
            <div key={user.user.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{paddingRight: '20px'}}>{user.user.email}</div>
              <div>{user.vacationDays}</div>
            </div>
          )
        })}
      </>
    )
  }

  const getFeedbackWeeksContent = (sprint: SprintInterface) => {
    return (
      <>
        {sprint.users.map(user => {
          return (
            <div key={user.user.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{paddingRight: '20px'}}>{user.user.email}</div>
              <div>{user.feedbackWeeks}</div>
            </div>
          )
        })}
      </>
    )
  }

  const getStorysContent = (sprint: SprintInterface) => {
    return (
      <>
        {sprint.users.map(user => {
          return (
            <div key={user.user.id}>
              <div><b>{user.user.email}</b></div>
              {sprint.issues.map(issue => {
                if (issue.user.id === user.user.id && issue.issueType.name == IssueTypeEnum.STORY) {
                  return <div key={issue.id} style={{marginLeft: '20px'}}>{issue.name} <small>{issue.summary}</small> </div>
                }
              })}
            </div>
          )
        })}
      </>
    )
  }

  const getBugsContent = (sprint: SprintInterface) => {
    return (
      <>
        {sprint.users.map(user => {
          return (
            <div key={user.user.id}>
              <div><b>{user.user.email}</b></div>
              {sprint.issues.map(issue => {
                if (issue.user.id === user.user.id && issue.issueType.name == IssueTypeEnum.BUG) {
                  return (
                    <div key={issue.id} style={{marginLeft: '20px'}}>{issue.name} <small>{issue.summary}</small> </div>
                  )
                }
              })}
            </div>
          )
        })}
      </>
    )
  }
  
  return (
    <>
      <div className={styles.pageGrid}>
        <div>
          <div className={styles.header}>
            <h3>Sprint details</h3>
            <p>Details of the sprint</p>
          </div>
          <CardWrapper>
            <>
              {info.sprints.map(sprint => {
                return (
                  <DetailCard
                    key = {sprint.id}
                    sprint={sprint}
                    sprintCount={sprint.bankHolidays}
                    content={getSprintDetailsContent(sprint)}
                  />
                )
                })
              }
            </>
          </CardWrapper>
        </div>
        <div>
          <div className={styles.header}>
            <h3>Vacation days</h3>
            <p>Number of vacation per user/sprint</p>
          </div>
          <CardWrapper>
            <>
              {info.sprints.map(sprint => {
                return (
                  <DetailCard
                    key = {sprint.id}
                    sprint={sprint}
                    sprintCount={sprint.users.reduce((total, user) => total = total + user.vacationDays, 0 )}
                    content={getVacationDaysContent(sprint)}
                  />
                )
                })
              }
            </>
          </CardWrapper>
        </div>
        <div>
          <div className={styles.header}>
            <h3>Feedback weeks</h3>
            <p>Number of suport guru per user/sprint</p>
          </div>
          <CardWrapper>
            <>
              {info.sprints.map(sprint => {
                return (
                  <DetailCard
                    key = {sprint.id}
                    sprint={sprint}
                    sprintCount={sprint.users.reduce((total, user) => total = total + user.feedbackWeeks, 0 )}
                    content={getFeedbackWeeksContent(sprint)}
                  />
                )
                })
              }
            </>
          </CardWrapper>
        </div>
      </div>
      <br />
      <div>
        <div className={styles.header}>
          <h3>Storys</h3>
          <p>Number of stories per user/sprint</p>
        </div>
        <CardWrapper>
          <>
            {info.sprints.map(sprint => {
              return (
                <DetailCard
                  key = {sprint.id}
                  sprint={sprint}
                  sprintCount={sprint.issues.reduce((total, issue) => issue.issueType.name == IssueTypeEnum.STORY ? total = total + issue.points : total, 0 )}
                  content={getStorysContent(sprint)}
                />
              )
              })
            }
          </>
        </CardWrapper>
      </div>
      <br />
      <div>
        <div className={styles.header}>
          <h3>Bugs</h3>
          <p>Number of bugs per user/sprint</p>
        </div>
        <CardWrapper>
          <>
            {info.sprints.map(sprint => {
              return (
                <DetailCard
                  key={sprint.id}
                  sprint={sprint}
                  sprintCount={sprint.issues.reduce((total, issue) => issue.issueType.name == IssueTypeEnum.BUG ? total = total + 1 : total, 0 )}
                  content={getBugsContent(sprint)}
                />
              )
            })}
          </>
        </CardWrapper>
      </div>
    </>
  )
}

export default DetailsTab
