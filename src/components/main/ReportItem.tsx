import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { FiEdit, FiInfo, FiActivity, FiEdit2 } from 'react-icons/fi'
import { Badge, Button, List, ThemeIcon } from '@mantine/core'

import styles from './ReportItem.module.css'
import { Status } from '@/interfaces/status'
import { UserDetail } from '@/interfaces/auth'
import { getMonthByNumber } from '@/utils/date'

interface Sprint {
  id: number;
  url: string;
  name: string;
  // manDaysNr: number;
  // storyPointsNr: number;
  // bugsNr: number;
}

interface ReportItemProps {
  data: {
    id: number;
    month: number;
    year: number;
    description: string;
    sprints: Sprint[];
    status: Status;
    users: Array<{
      user: UserDetail
    }>
  },
  showUpdate: boolean;
  showEdit: boolean;
}

const ReportItem = ({data, showUpdate, showEdit}: ReportItemProps) => {
  return (
    <div className={`${styles.container} item-animation`}>
      <div className={styles.details}>
        <div className={styles.info}>
          <Image src={`/months/${data.month}.jpg`} alt={`/${data.month}`} width="64" height="64" />
          <div>
            <h3 style={{color: '#3a4374', marginBottom: '10px'}}>{getMonthByNumber(data.month)} {data.year}</h3>
            <Badge size="lg" radius="lg" color='teal' >
              {data.status.name}
            </Badge>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <FiActivity size={16} />
                </ThemeIcon>
              }
              style={{
                marginTop: '10px',
                marginLeft: '20px'
              }}
            >
            {data.sprints.map(sprint => {
              return (
                <List.Item key={sprint.id}>
                  <a href={sprint.url} target='_blank' rel="noreferrer" style={{color: '#3a4374'}}>
                    <div>{sprint.name}</div>
                  </a>
                </List.Item>
              )
            })}
            </List>
            <br />
            <div>{data.description}</div>
          </div>
        </div>
        <div style={{'cursor': 'pointer', 'display': 'flex', 'flexDirection': 'row', 'gap': '20px'}}>
          <Link href={`/report/info/${data.id}`} passHref>
            {/* we need this div because  Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?*/}
            <div>
              <FiInfo size={25} color='#e64980'/>
            </div>
          </Link>
          {showUpdate && ( 
            <Link href={`/report/${data.id}`} passHref>
              <div>
                <FiEdit size={25} color='#e64980'/>
              </div>
            </Link>
          )}
          {showEdit && (
            <Link href={`/report/edit/${data.id}`} passHref>
              <div>
                <FiEdit2 size={25} color='#e64980'/>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportItem
