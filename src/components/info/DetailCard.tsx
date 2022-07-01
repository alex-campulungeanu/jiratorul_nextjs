import React from 'react'
import { Badge } from '@mantine/core'

import styles from './DetailCard.module.css'
import { SprintInterface } from '../../pages/report/info/[id]'

interface DetailsCardProps{
  sprint: SprintInterface,
  sprintCount: number,
  content?: any
}

const DetailCard = ({sprint, sprintCount, content}: DetailsCardProps) => {
  return (
    <>
      <div className={styles.txt}>
        <div>
          <div className={styles.bullet}></div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <p>{sprint.name}</p>
            <Badge>{sprintCount}</Badge>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </>
  )
}

export default DetailCard
