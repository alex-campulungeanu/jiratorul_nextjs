import { useAuth } from "./AuthProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { userHasRoles } from '@/utils/auth'
import LoaderComponent from '@/components/Loader'

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing, setRedirect, auth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user) {
        // remember the page that user tried to access
        setRedirect(router.route)
        router.push("/login")
      } else {
        if (!userHasRoles(children.props.roles, user)) {
          console.log('Dont have roles !')
          setRedirect(router.route)
          auth.signOut()
          router.push({
            pathname: '/403',
            query: { reason: `Not enough permissions, you  must be ${children.props.roles} !` }
          }, '403')
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing, router, user, setRedirect])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}> 
        <LoaderComponent /> 
      </div>
    )
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return <>{children}</>
  }
  return <>{children}</>
  /* otherwise don't return anything, will do a redirect from useEffect */
  // return null
}
