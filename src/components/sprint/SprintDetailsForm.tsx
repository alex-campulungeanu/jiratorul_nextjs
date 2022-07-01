import React from 'react'
import { useForm } from '@mantine/form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { BsCalendarDay } from 'react-icons/bs'

import { SprintInterface } from '@/pages/report/[id]'
import { updateSprintDetails } from '@/services/sprintService'
import { Button, Group, TextInput } from '@mantine/core'

interface SprintDetailsInterface {
  sprint: SprintInterface;
  onSave: () => void
  onCancel: () => void
}

const SprintDetailsForm = ({sprint, onSave, onCancel}: SprintDetailsInterface)  => {
  const detailsForm = useForm({
    initialValues: {
      bankHolidays: sprint.bankHolidays,
    },
    validate: {
      bankHolidays: (value: string) => {
        if (parseInt(value) > 10) {
          return 'Nu are cum, un sprint nu are asa multe zile !'
        } else if (!value) {
          return 'Trebuie sa pui ceva aici'
        }
      }
    },
  });
  const updateSprintDetailsMutation = useMutation(updateSprintDetails, {
    onSuccess: data => {
      toast(`Sprint ${sprint.name} updated`)
      onSave()
    },
    onError: (error: any) => {
      toast.error('Unable to update sprint details !')
    }
  });

  const handleSubmitDetails = () => {
    const details = {...detailsForm.values, sprintId: sprint.id}
    updateSprintDetailsMutation.mutate(details)
  }
  return (
    <div>
      <div>{sprint.name}</div>
      <br />
      <form onSubmit={detailsForm.onSubmit(handleSubmitDetails)}>
        <TextInput
          label="Bank holidays"
          placeholder='Bank holidays'
          icon={<BsCalendarDay />}
          {...detailsForm.getInputProps('bankHolidays')}
        />
        <br />
        <Group position='right'>
          <Button variant='outline' onClick={() => onCancel()}>
            CANCEL
          </Button>
          <Button type="submit">
            SAVE
          </Button>
        </Group>
      </form>
    </div>
  )
}

export default SprintDetailsForm
