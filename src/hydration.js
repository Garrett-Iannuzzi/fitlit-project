class Hydration {
  constructor(hydrationInfo) {
    this.hydrationInfo = hydrationInfo;
  }

  getAllTimeDailyHydrationAvg() {
    let dailyHydration = this.hydrationInfo.reduce((ounces, stat) => {
      ounces += stat.numOunces / this.hydrationInfo.length;
      return ounces;
    }, 0)
    return Number(dailyHydration.toFixed(0));
  }

  getOuncesPerDayByDate(date) {
    let totalOunces = this.hydrationInfo.find(user => user.date === date)
    return totalOunces.numOunces;
  }

  getOuncesPerDayByWeek(date) {
    let todayDateIndex = this.hydrationInfo.findIndex(user => user.date === date)
    console.log(todayDateIndex);
    let ouncesByWeek = this.hydrationInfo.slice(todayDateIndex - 6, todayDateIndex + 1).map(user => user.numOunces)
    return ouncesByWeek
  }

}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
