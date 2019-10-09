class Sleep {
  constructor(sleepInfo) {
    this.sleepInfo = sleepInfo;
  }

  getAvgHrsSleptPerDay() {
    let avgSleep = this.sleepInfo.reduce((acc, cv) => {
      acc += cv.hoursSlept / this.sleepInfo.length
      return acc
    }, 0)
    return Number(avgSleep.toFixed(2))
  }



}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
