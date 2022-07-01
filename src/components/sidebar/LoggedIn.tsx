import React, { forwardRef } from 'react';
import { Menu, Divider, Text, Group, Avatar, UnstyledButton } from '@mantine/core';
import { AiOutlineLogout } from 'react-icons/ai'
import { GoKebabHorizontal } from 'react-icons/go';

import {useAuth} from '@/components/auth/AuthProvider'
import styles from './LoggedIn.module.css'
import UserAvatar from '../UserAvatar';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'>  {
  name: string;
  email: string;
  roles?: string[];
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps> (
  ({ name, email, roles, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        borderRadius: '10px',
        color: theme.black,
        // backgroundColor: theme.colors.gray[0],
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <UserAvatar name={name}/>
        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis'}}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
          <Text color="dimmed" size="xs">
            {roles?.toString()}
          </Text>
        </div>
        {icon || <GoKebabHorizontal size={16} />}
      </Group>
    </UnstyledButton>
  )
);

const LoggedIn = () => {
  const { user, auth } = useAuth()
  return (
    <div className={styles.container}>
      <Group position="center">
        <Menu
          withArrow
          placement="center"
          control={
            <UserButton
              name={user.name}
              email={user.email}
              roles={user.roles}
            />
          }
        >
          <Menu.Label>User info</Menu.Label>
            {/* <Menu.Item icon={<AiFillAlert size={14} />}>Settings</Menu.Item>
            <Divider /> */}
            {/* <Menu.Label>Danger zone</Menu.Label> */}
            <Menu.Item 
              color="red" 
              icon={<AiOutlineLogout size={14} />}
              onClick={() => auth.signOut()}
            >
              Log out
            </Menu.Item>
        </Menu>
      </Group>
    </div>
  )
}

export default LoggedIn
