import React from 'react'
import { useMutation} from 'react-query'
import { Badge, Button, Divider, Group, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { toast } from 'react-toastify'
import { BsCalendarDay } from 'react-icons/bs'

import styles from './UserDetailsForm.module.css'
import { updateUserDetails } from '@/services/sprintService'
import { UserSprintInterface, SprintInterface } from '@/pages/report/[id]'
import BadgeCustom from '@/components/BadgeCustom'
import { IssueTypeEnum } from '@/enums/issue-type-enum'
import CardWrapper from '../info/CardWrapper'

interface UserDetailsFormInterface {
  sprint: SprintInterface;
  user: UserSprintInterface,
  onSave: () => void,
  onCancel: () => void
}

const UserDetailsForm = ({user, sprint, onSave, onCancel}: UserDetailsFormInterface) => {
  const detailsForm = useForm({
    initialValues: {
      vacationDays: user.completed ? user.vacationDays : null,
      feedbackWeeks: user.completed ? user.feedbackWeeks : null,
    },
    validate: {
      vacationDays: (value: number | null) => {
        if (value != null && value > 10) {
          return 'Fii serios, cine ti-a dat tie asa mult concediu !'
        } else if (value == null) {
          return 'Trebuie sa pui ceva aici'
        }
      },
      feedbackWeeks: (value: number | null) => {
        if (value != null && value > 2) {
          return 'Au fost doar 2 saptamani, barosane !'
        } else if (value == null) {
          return 'Trebuie sa pui ceva aici'
        }
      },
    },
  });
  const updateUserDetailsMutation = useMutation(updateUserDetails, {
    onSuccess: data => {
      toast(`User ${user.name} updated`)
      onSave()
    },
    onError: (error: any) => {
      toast.error('Unable to update user details !')
    }
  });

  const handleSubmitDetails = () => {
    const details = {...detailsForm.values, userId: user.id, sprintId: sprint.id}
    updateUserDetailsMutation.mutate(details)
  }

return (
    <div>
      <h3 style={{color: 'rgb(58, 67, 116)'}}>{user.email}</h3>
      <br />
      <CardWrapper background='#f7f8fd'>
        <>
          {sprint.issues.map(issue => {
            if (issue.userId === user.id) {
              return (
                <div style={{marginBottom: '10px'}} key={issue.id}>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <a href={issue.url} target='_blank' rel="noreferrer" style={{color: '#3a4374'}}>
                        <div>{issue.name}</div>
                    </a>
                    <div style={{paddingLeft: '5px', paddingRight: '5px'}}>
                      <BadgeCustom condition={issue.issueType.name == IssueTypeEnum.STORY} trueText={issue.issueType.name} falseText={issue.issueType.name} />
                    </div>
                    <div>{issue.points} points</div>
                  </div>
                  <div style={{paddingLeft: '15px'}}><small>{issue.summary}</small></div>
                </div>
              )
            }
          })}
        </>
      </CardWrapper>
      <form onSubmit={detailsForm.onSubmit(handleSubmitDetails)} className={styles.form}>
        <NumberInput
          label="Vacation days"
          placeholder='Vacation days'
          icon={<BsCalendarDay />}
          style={{ width: '50%'}}
          min={0}
          {...detailsForm.getInputProps('vacationDays')}
          />
        <NumberInput
          label="Feedback weeks"
          placeholder='Feedback weeks'
          icon={<BsCalendarDay />}
          style={{ width: '50%'}}
          {...detailsForm.getInputProps('feedbackWeeks')}
        />
        <Group position='right'>
          <Button variant='outline' onClick={() => onCancel()}>
            CANCEL
          </Button>
          <Button 
            type="submit"
            loading={updateUserDetailsMutation.isLoading}
          >
            SAVE
          </Button>
        </Group>
      </form>
    </div>
  )
}

export default UserDetailsForm
