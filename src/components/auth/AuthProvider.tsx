import React, { createContext, useContext, useEffect, useState } from "react"
import { Auth, User } from "../../auth"

const auth = new Auth() // singleton

const redirectKey = "sign_in_redirect"

export const AuthContext = createContext<
  | {
      auth: Auth
      initializing: boolean
      user: User
      error: { message: string }
      setRedirect: (redirect: string) => void
      getRedirect: () => string | null
      clearRedirect: () => void
    }
  | undefined
>(undefined)

AuthContext.displayName = "AuthContext"

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(redirectKey, redirect)
}

function getRedirect(): string | null {
  return window.sessionStorage.getItem(redirectKey)
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey)
}

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return auth
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [initializing, setInitializing] = useState(true)

  /*
    NOTICE: this is not production ready code!
    just a quick demo of resolving the initial user
  */
  // TODO: remove any from  next user: any
  useEffect(() => {
    auth.onAuthStateChanged((user: any, error) => {
      if (user) {
        setUser(user)
        setError(null)
      } else {
        setUser(null)
        if (error) {
          setError(error)
        }
      }
      setInitializing(false)
    })
    auth.resolveUser(2000)
  }, [])

  const value = {
    user: user,
    error,
    auth,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect,
  }
  // TODO: fix next line, remove exception
  // @ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
