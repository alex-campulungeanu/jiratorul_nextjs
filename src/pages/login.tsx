import { NextPage } from "next";
import Link from "next/link";
import { TiDelete } from 'react-icons/ti'
import {Button, TextInput, Paper, LoadingOverlay, PasswordInput, Group, Checkbox, Text, Anchor} from '@mantine/core'
import { useForm } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FaRegEnvelope, FaLock } from 'react-icons/fa'
import { useRouter } from "next/router";

import styles from '../styles/Login.module.css'
import { Credentials } from '../interfaces/auth'
import { loginService } from '../services/authService'
import { useAuth } from '../components/auth/AuthProvider'
import LoaderComponent from "@/components/Loader";

const Login: NextPage = () => {
  const [formType, setFormType] = useState<'register' | 'login'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { auth, initializing, user, getRedirect, clearRedirect } = useAuth()
  const router = useRouter()
  const toggleFormType = () => {
    setFormType((current) => (current === 'register' ? 'login' : 'register'));
    setError(null);
  };

  useEffect(() => {
    if(user) {
      router.push("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: true,
    },
    validationRules: {
      // firstName: (value) => formType === 'login' || value.trim().length >= 2,
      // lastName: (value) => formType === 'login' || value.trim().length >= 2,
      // email: (value) => /^\S+@\S+$/.test(value),
      // password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
      // confirmPassword: (val, values) => formType === 'login' || val === values?.password,
    },
    errorMessages: {
      email: 'Invalid email',
      password: 'Password should contain 1 number, 1 letter and at least 6 characters',
      confirmPassword: "Passwords don't match. Try again",
    },
  });

  const handleSubmit = async () => {
    if (formType === 'login') {
      const credentials: Credentials = {
        email: form.values.email,
        password: form.values.password,
      }
      try {
        setLoading(true)
        await loginService(credentials, auth)
        setLoading(false)
        router.push('/')
      } catch (error: any) {
        setLoading(false)
        console.log(error);
        setError(error)
      }
      // loginMutation.mutate(credentials, auth)
      // const response = await auth.signIn(credentials.email, credentials.password, 100)
    }
  }

  if (initializing || user) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}> 
        <LoaderComponent />
      </div>
    )
  }

  return(
    <div className={styles.background}>
      <Link href="/" passHref>
        <div className={styles.backButton}>
          <TiDelete />
        </div>
      </Link>
      <div className={styles.main}>
        <Paper
          shadow='sm'
          style={{
            position: 'relative',
            maxWidth: '1160px',
            width: '50%',
            padding: '25px',
            margin: '0 auto',
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={loading} />
            {formType === 'register' && (
              <Group grow>
                <TextInput
                  data-autofocus
                  required
                  placeholder="Your first name"
                  label="First name"
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  required
                  placeholder="Your last name"
                  label="Last name"
                  {...form.getInputProps('lastName')}
                />
              </Group>
            )}
            <TextInput
              mt="md"
              required
              placeholder="Your email"
              label="Email"
              icon={<FaRegEnvelope />}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              required
              placeholder="Password"
              label="Password"
              icon={<FaLock />}
              {...form.getInputProps('password')}
            />
            {formType === 'register' && (
              <PasswordInput
                mt="md"
                required
                label="Confirm Password"
                placeholder="Confirm password"
                icon={<FaLock />}
                {...form.getInputProps('confirmPassword')}
              />
            )}
            {formType === 'register' && (
              <Checkbox
                mt="xl"
                label="I agree to sell my soul and privacy to this corporation"
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
              />
            )}
            {error && (
              <Text color="red" size="sm" mt="sm">
                {error}
              </Text>
            )}
            { (
              <Group position="right" mt="xl">
              {/* <Group position="apart" mt="xl"> */}
                {/* <Anchor
                  component="button"
                  type="button"
                  color="gray"
                  onClick={toggleFormType}
                  size="sm"
                >
                  {formType === 'register'
                    ? 'Have an account? Login'
                    : "Don't have an account? Register"}
                </Anchor> */}
                <Button 
                  color="blue" 
                  type="submit"
                  loading={loading}
                >
                  {formType === 'register' ? 'Register' : 'Login'}
                </Button>
              </Group>
            )}
          </form>
        </Paper>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      // requireAuthCheck: false,
      protected: false,
    }
  };
}

export default Login