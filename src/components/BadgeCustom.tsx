import { Badge } from '@mantine/core'
import React from 'react'

interface BadgeCustomProps {
  condition: boolean,
  trueText: string,
  falseText: string
}

const BadgeCustom = ({condition, trueText, falseText}: BadgeCustomProps) => {
  return (
    <div>
      <Badge size="md" radius="lg" color={condition ? 'teal' : 'red'} >
        {condition ? trueText : falseText}
      </Badge>
    </div>
  )
}

export default BadgeCustom
