import { User } from "@/auth"

const userHasRoles = (pageRoles: string[], user: User): boolean => {
  if(!pageRoles) {
    return true
  }
  else if (pageRoles.some(pageRole => user?.roles.includes(pageRole))) {
    return true
  } 
  else {
    return false
  }
}

export {
  userHasRoles
}