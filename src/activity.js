class Activity {
  constructor(activityInfo, user) {
    this.activityInfo = activityInfo;
    this.strideLength = user.strideLength;
    this.date = {};
  }

  getUserActivityByDate(date) {
    this.date = this.activityInfo.find(loggedActivity => loggedActivity.date === date);
    return this.date;
  }

  getMilesWalked(date) {
    this.getUserActivityByDate(date);
    return Math.round(this.date.numSteps * this.strideLength / 5280 *10) / 10;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
