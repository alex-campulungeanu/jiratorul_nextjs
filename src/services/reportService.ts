import { axiosInstance } from '@/lib/axiosInstance'

const addReport = async (data: any) => {
  const res = await axiosInstance.post('/report', data)
  return res
}

const updateReport = async({id, data}: {id: number, data: any}) => {
  const res = await axiosInstance.patch(`/report/update/${id}`, data)
  return res
}

const getReports = async () => {
  const res = await axiosInstance.get('/report')
  return res
}

const getById = async (id: any) => {
  const res = await axiosInstance.get(`/report/${id}`)
  return res
}

const populateReport = async ({reportId, jiraSessionId} : {reportId: string | string[] | undefined, jiraSessionId: string}) => {
  const res = await axiosInstance.post(`/report/populate/${reportId}`, {jiraSesionId: jiraSessionId})
  return res
}

const getInfoById = async (id: any) => {
  const res = await axiosInstance.get(`/report/info/${id}`)
  return res
}

export { 
  addReport,
  updateReport,
  getReports,
  getById,
  populateReport,
  getInfoById
}