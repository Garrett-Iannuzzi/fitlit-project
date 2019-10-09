class Sleep {
  constructor(sleepInfo) {
    this.sleepInfo = sleepInfo;
  }

  getAvgMetricPerDayAllTime(stat) {
    let allSleepData = this.sleepInfo.reduce((acc, user) => {
      acc += user[stat] / this.sleepInfo.length
      return acc 
    }, 0)
    return Number(allSleepData.toFixed(1))
  }

  getHrsSleptByDate(date) {
    let findDate = this.sleepInfo.find(user => user.date === date);
    return findDate.hoursSlept
  }



}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
