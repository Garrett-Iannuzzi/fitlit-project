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

}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
