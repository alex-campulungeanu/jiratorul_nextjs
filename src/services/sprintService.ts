import { axiosInstance } from '@/lib/axiosInstance'

const updateUserDetails = async ({userId, sprintId, ...details}) => {
  const res = await axiosInstance.patch(`/sprint-user/${sprintId}/user/${userId}`, details)
  return res
}

const updateSprintDetails = async ({sprintId, ...data}) => {
  const res = await axiosInstance.patch(`/sprint/${sprintId}`, data)
  return res
}

export {
  updateUserDetails,
  updateSprintDetails,
}