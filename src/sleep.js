class Sleep {
  constructor(sleepInfo) {
    this.sleepInfo = sleepInfo;
    this.wellRested = false;
  }

  getAvgMetricPerDayAllTime(stat) {
    let allSleepData = this.sleepInfo.reduce((acc, user) => {
     acc += user[stat] / this.sleepInfo.length
     return acc 
    }, 0);
    return Number(allSleepData.toFixed(1));
  }

  getMetricByDate(date, metric) {
    let findDateAndMetric = this.sleepInfo.find(user => user.date === date);
    return findDateAndMetric[metric];
  }

  getMetricByWeek(date, metric) {
    let findDateIndex = this.sleepInfo.findIndex(user => user.date === date);
    let findMetric = this.sleepInfo.splice(findDateIndex - 6, 7).map(user => user[metric]);
    return findMetric;
  }

  getUserSleepStatus(date) {
    let findDate = this.sleepInfo.find(user => user.date === date);
    this.wellRested = (findDate.hoursSlept > 8) ? true : false;
    let sleepyStatus = (findDate.hoursSlept > 8) ? 'Well Rested!' : 'Sleepy!';
    return sleepyStatus
    }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
