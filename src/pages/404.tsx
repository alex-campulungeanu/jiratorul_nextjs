import Link from 'next/link'
import { useEffect } from 'react';
import gsap from 'gsap'
import { Button } from '@mantine/core';

import FloatingAstronaut from '@/components/FloatingAstronaut'
import styles from '@/styles/404.module.css'

const FourOhFour = () => {
  useEffect(() => {
    gsap.to('.hover', {
      duration: 3,
      x: gsap.utils.random(5, 10),
      y: gsap.utils.random(10, 100),
      rotation: gsap.utils.random(-20, 20),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      transformOrigin: '50% 50%',
    });
  });
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={`${styles.sectionContain} ${styles.content}`}>
          <h1 className={styles.h1}>404</h1>
          <br />
          <h2 className={styles.h2}>Lost in space?</h2>
          <Link href="/" passHref>
            <Button color="teal" component='a' >
              Go home
            </Button>
          </Link>
          <br />
        </div>
        <div className={`hover ${styles.floating}`}>
          <FloatingAstronaut />
        </div>
      </section>
    </div>
  )
}

export default FourOhFour