import React from 'react'

import { ReportInfoInterface, SprintInterface } from '@/pages/report/info/[id]'
import { getMonthByNumber } from '@/utils/date'
import CardWrapper from '@/components/info/CardWrapper'
import { getManDaysPerSprint, getStoryPointsPerSprint, getBugsNrPerSprint } from '@/utils/info'

interface SummaryProps  {
  info: ReportInfoInterface
}

const Summary = ({info}: SummaryProps) => {
  return (
    <CardWrapper color='#0ca678'>
      <div>
        <div>Salutare</div>
        <br />
        <div>Situatia pentru luna <b>{getMonthByNumber(info.month)} {info.year}</b></div>
        <div>1.  Nr de sprinturi terminate in <b>{getMonthByNumber(info.month)}</b> (1-2)</div>
        <div>{info.sprints.length}</div>
        <br />
        <div>2. Durata sprinturilor</div>
        <div>10 zile/sprint</div>
        <br />
        <div>3. Daca folositi story points sau nu </div>
        <div>da</div>
        <br />
        <div>4. Capacitatea echipei in fiecare sprint (man days) – doar persoanele din echipa noastra </div>
        {info.sprints.map((sprint: SprintInterface) => {
          return (
            <div key={sprint.id}>
              <b>{sprint.name} : </b>
              {sprint.sprintDays} x {sprint.users.length} - {sprint.bankHolidays} - {getManDaysPerSprint(sprint)} = <b>{sprint.sprintDays*sprint.users.length - sprint.bankHolidays - getManDaysPerSprint(sprint)} </b>
            </div>
          )
        })}
        <br />
        <div>5. Nr de story points livrate, pe fiecare sprint, de persoanele din echipa noastra – daca nu folositi SP, inlocuiti cu feature/taks/stories</div>
        {info.sprints.map((sprint: SprintInterface) => {
          return (
            <div key={sprint.id || 'story'}>
              <b>{sprint.name}</b> : {getStoryPointsPerSprint(sprint)}
            </div>
          )
        })}
        <br />
        <div>6. Nr bug-uri existente in sprint</div>
        {info.sprints.map((sprint: SprintInterface) => {
          return (
            <div key={sprint.id || 'bug'}>
              <b>{sprint.name}</b> : {getBugsNrPerSprint(sprint)}
            </div>
          )
        })}
        <br />
        <div>7. Cine a lucrat la Feedback:</div>
        {info.sprints.map((sprint: SprintInterface) => {
          return (
            <div key={sprint.id || 'feedback'}>
              <b>{sprint.name}</b>
              <ul>
                {sprint.users.map(user => (
                  <li key={user.user.id}>{user.user.email} : {user.feedbackWeeks} saptamana</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </CardWrapper>
  )
}

export default Summary
