import React from 'react'
import { Avatar } from '@mantine/core'

const UserAvatar = ({name}: {name: string}) => {
  return (
    <>
      <Avatar color="cyan" radius="xl">{name.charAt(0).toUpperCase()}</Avatar>
    </>
  )
}

export default UserAvatar
