import { axiosInstance } from "./lib/axiosInstance"

export type UserCB = (user: User | null, error: any) => void

export type User = {
  email: string
  name: string
  token: string
  roles: string[]
}

export class Auth {
  user: User | null
  error: { message: string } | null
  cb: UserCB | null

  constructor() {
    this.user = null
    this.error = null
    this.cb = null
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb

    return () => {
      this.cb = null
    }
  }

  protected onUserChange(user: User | null, error?: { message: string }) {
    this.cb && this.cb(user, error)
  }

  async signIn(email: string, password: string, delay = 2000) {
    const response = await axiosInstance.post('/login', {email: email, password: password})
    this.user = {
      name: response.data.user.name,
      email: response.data.user.email,
      token: response.data.token,
      roles: response.data.user.roles
    }

    window.sessionStorage.setItem("user", JSON.stringify(this.user))
    this.onUserChange(this.user)
    // console.log(`Sign in with email: ${email} password: ${password}`)
    // return new Promise((resolve, reject) => {
    //   if (email !== userEmail || password !== userPassword) {
    //     const error = { message: "Wrong email or password" }
    //     this.error = error
    //     reject(error)
    //     this.onUserChange(null, this.error)

    //     return
    //   }
    //   setTimeout(() => {
    //     this.user = {
    //       name: "Ivan",
    //       email,
    //       token: "dfasdfadsf.asdfasdf.afsdfasd",
    //     }

    //     window.sessionStorage.setItem("user", JSON.stringify(this.user))
    //     this.onUserChange(this.user)
    //     resolve(this.user)
    //   }, delay)
    // })
  }

  signOut() {
    window.sessionStorage.removeItem("user")
    this.user = null
    this.onUserChange(this.user)
  }

  resolveUser(timeout: number) {
    // setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user")
        if (signedInUser) {
          this.user = JSON.parse(signedInUser)
        }
      } else {
        this.user = null
      }
      this.onUserChange(this.user)
    // }, timeout)

    return this
  }
}
