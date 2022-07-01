import React, { useEffect, useState } from 'react'
import { ActionIcon, Badge, Box, Button, Group, Select, Text, TextInput, Tooltip } from '@mantine/core'
import { formList, useForm } from '@mantine/form'
import { AiOutlineCalendar, AiFillFileText } from 'react-icons/ai'
import { BiPlus, BiTrash, BiInfoCircle } from 'react-icons/bi'
import Link from 'next/link'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import styles from '../../pages/report/index.module.css'
import { generateReportMonthList, generateReportYearList, getYearByMonth} from '@/utils/date'
import { addReport, updateReport } from '@/services/reportService'
import { useRouter } from 'next/router'
import { ReportInterface } from '@/pages/report/[id]'

interface ReportFormProps {
  label: string;
  data?: ReportInterface;
}

const ReportForm = ({ label, data} : ReportFormProps) => {
  const queryClient = useQueryClient();
  const [reportMonthList, setReportMonthList] = useState(generateReportMonthList(5))
  const isNew = typeof data === 'undefined'
  const [apiError, setApiError] = useState('')
  const router = useRouter()
  const form = useForm({
    initialValues: {
      month: '',
      year: '',
      description: '',
      sprints: formList([
        { url: '', key: '', usersInfo: '0/0', name: 'N/A' },
        { url: '', key: '', usersInfo: '0/0', name: 'N/A' }
      ]),
    },
    validate: {
      month: (value) => (value ? null : 'Month must be filled'),
      year: (value) => (value ? null : 'Year must be filled'),
      sprints: {
        url: (value) => (value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ? null : 'Provide a correct URL address'),
      }
    },
  });

  useEffect( ()=> {
    if (!isNew) {
      const mapppedSprints = data.sprints.map(sprint => {
        const totalUsers = sprint.users.length
        const completedUsers = sprint.users.filter(user  => user.completed == true).length
        return {
          url: sprint.url, 
          key: sprint.id.toString(),
          usersInfo: `${completedUsers}/${totalUsers}`,
          name: sprint.name || 'N/A'
        }
      })
      form.setFieldValue('month', data.month.toString())
      form.setFieldValue('year', data.year.toString())
      form.setFieldValue('description', data?.description)
      form.setFieldValue('sprints', formList(mapppedSprints))
    }
  }, [data])

  useEffect(() => {
    if (isNew) {
      form.setFieldValue('year', getYearByMonth(parseInt(form.values.month)).toString())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.month])

  const addReportMutation = useMutation(addReport, {
    onSuccess: data => {
      queryClient.invalidateQueries('report')
      router.push('/')
    },
    onError: (error: any) => {
      setApiError(error.data)
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });

  const updateReportMutation = useMutation(updateReport, {
    onSuccess: data => {
      queryClient.invalidateQueries('report')
      toast(`Report updated`)
      setApiError('')
      // router.push('/')
    },
    onError: (error: any) => {
      setApiError(error.data)
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });

  const handleSubmit = () => {
    const report = form.values
    if (isNew) {
      addReportMutation.mutate(report)
    } else {
      updateReportMutation.mutate({id: data.id, data: report})
    }
  }

  const sprints = form.values.sprints.map((sprint, index) => {
    return (
      <Group key={index} mt="xs">
        <TextInput
          placeholder={`Sprint ${index + 1}`}
          sx={{ flex: 1 }}
          {...form.getListInputProps('sprints', index, 'url')}
        />
        <Badge size="lg" radius="lg" color='teal' >
          {sprint.usersInfo}
        </Badge>
        <Tooltip 
          transition="fade"
          label={sprint.name}
          color='teal'
        >
          <ActionIcon
            color="teal"
            variant="hover"
          >
            <BiInfoCircle color='teal'/>
          </ActionIcon>
        </Tooltip>
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => form.removeListItem('sprints', index)}
        >
          <BiTrash size={16} />
        </ActionIcon>
      </Group>
    )
  }
);

  return (
    <div>
      <form 
        className={styles.form}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg" style={{'position': 'absolute', 'top': '55px'}}>
          <defs>
            <radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a" >
              <stop stopColor="#E84D70" offset="0%" />
              <stop stopColor="#A337F6" offset="53.089%" />
              <stop stopColor="#28A7ED" offset="100%" />
            </radialGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <circle fill="url(#a)" cx="28" cy="28" r="28" />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
            />
          </g>
        </svg>
        <h1 style={{'color': '#3a4374','paddingBottom': '26px', 'paddingTop': '16px'}}>{label}</h1>
        <Group grow>
          <Select
            label="Report month"
            placeholder="Choose report month"
            icon={<AiOutlineCalendar />}
            {...form.getInputProps('month')}
            data={reportMonthList}
            defaultValue={reportMonthList[0].value}
          />
          <TextInput
            label="Year"
            placeholder='year'
            icon={<AiOutlineCalendar />}
            disabled={isNew}
            {...form.getInputProps('year')}
          />
        </Group>
        <TextInput
          label="Description"
          placeholder='Description'
          icon={<AiFillFileText />}
          {...form.getInputProps('description')}
        />
        <Box>
          {sprints.length > 0 ? (
            <Group>
              <Text weight={500} size="sm" sx={{ flex: 1 }}>
                Sprints URL
              </Text>
              <Text  weight={500} size="sm"></Text>
              <Text  weight={500} size="sm"></Text>
              <Text  weight={500} size="sm"></Text>
            </Group>
          ) : (
            <Text color="dimmed" align="left">
              No sprint added
            </Text>
          )}
          {sprints}
          <Group position="left" mt="md">
            <Button leftIcon={<BiPlus />} variant='outline' onClick={() => form.addListItem('sprints', { url: '', key: '', name: '', usersInfo: ''})}>
              Add sprint
            </Button>
          </Group>
        </Box>
        {apiError && (
            <Text color="red" size="sm" mt="sm">
              {apiError}
            </Text>
          )}
        <Group position="right" mt="xl">
          <Link href="/" passHref>
            <Button color="grey" variant='outline'>
              CANCEL
            </Button>
          </Link>
          <Button 
            color="blue" 
            type="submit"
            disabled={addReportMutation.isLoading}
          >
            {isNew ? 'Save report' : 'Update report'}
          </Button>
        </Group>
      </form>
    </div>
  )
}

export default ReportForm
