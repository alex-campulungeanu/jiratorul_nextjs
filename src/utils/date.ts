const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const generateReportMonthList = (interval: number) => {
  const currentDay = new Date();
  const currentMonth = currentDay.getMonth()
  // let nextMonths = []
  // for (let i = currentMonth; i <= currentMonth + interval; i++) {
  //   let currentNextMonthKey = i % 12 + 1
  //   let currentNextMonthLabel = months[currentNextMonthKey]
  //   nextMonths.push(
  //     {
  //       value: currentNextMonthKey.toString(),
  //       label: currentNextMonthLabel.toString(),
  //     }
  //   )
  // }
  let previousMonths: Array<{
    value: string,
    label: string
  }>= []
  for (let i = 0; i <= interval; i++) {
    let currentPreviousMonthKey = currentMonth - i > 0 ? currentMonth - i : currentMonth - i + 12
    let currentPreviousMonthLabel = months[currentPreviousMonthKey - 1]
    previousMonths.push(
      {
        value: currentPreviousMonthKey.toString(),
        label: currentPreviousMonthLabel.toString(),
      }
    )
  }
  return previousMonths
}

const generateReportYearList = (month: number) => {
  const currentDay = new Date();
  const currentYear = (currentDay.getFullYear()).toString()
  const previousYear = (currentDay.getFullYear() - 1).toString()
  return [
    {
      value: currentYear,
      label: currentYear,
    },
    {
      value: previousYear,
      label: previousYear,
    },
  ]
}

const getYearByMonth = (month: number) => {
  const currentDay = new Date()
  const currentMonth = currentDay.getMonth()
  const currentYear = currentDay.getFullYear()
  if ((month > currentMonth)) {
    return currentYear - 1
  }
  return currentYear
}

const getMonthByNumber = (nr: number) => {
  return months[nr - 1]
}

export {
  generateReportMonthList,
  generateReportYearList,
  getMonthByNumber,
  getYearByMonth
}