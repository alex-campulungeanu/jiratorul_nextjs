import { SprintInterface } from '@/pages/report/info/[id]'
import { IssueTypeEnum } from '@/enums/issue-type-enum'

const getManDaysPerSprint = (sprint: SprintInterface): number => {
  const res =  sprint.users?.reduce((total, user) => {
    return total + user.vacationDays
  }, 0)

  return res
}

const getStoryPointsPerSprint = (sprint: SprintInterface): number => {
  const res = sprint.issues?.reduce((total, issue) => {
    if (issue.issueType.name == IssueTypeEnum.STORY) {
      total =  total + issue.points
    }
      return total
  }, 0)
  return res
}

const getBugsNrPerSprint = (sprint: SprintInterface): number => {
  const res = sprint.issues?.reduce((total, issue) => {
    if (issue.issueType.name == IssueTypeEnum.BUG) {
      total =  total + 1
    }
      return total
  }, 0)
  return res
}

export {
  getManDaysPerSprint,
  getStoryPointsPerSprint,
  getBugsNrPerSprint
}