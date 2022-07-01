import React from 'react'
import { HiOutlineLightBulb, HiPlus } from 'react-icons/hi';
import { Button } from '@mantine/core';
import Link from 'next/link';

import styles from './Header.module.css'


interface HeaderProps {
  showAdd?: boolean;
  name?: any;
}

const Header = ({showAdd, name}: HeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <HiOutlineLightBulb className={styles.icon}/>
      </div>
      {showAdd && 
        <Link href="/report" passHref>
          <Button 
            variant="gradient" 
            gradient={{ from: 'grape', to: 'pink', deg: 35 }}
            leftIcon={<HiPlus />}
            component='a' 
          >
            Add report
          </Button>
        </Link>
      }
      {name &&
        <h3 className={styles.text}>
          {name}
        </h3>
      }
    </div>
  )
}

export default Header
