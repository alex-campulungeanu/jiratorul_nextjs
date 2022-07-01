import { Credentials } from '../interfaces/auth'

export const loginService = async(credentials: Credentials, auth: any) => {
  const response = await auth.signIn(credentials.email, credentials.password, 100)
  return response
}