class Activity {
  constructor(activityInfo, user) {
    this.activityInfo = activityInfo;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.date = {};
  }

  getActivityInfoByDate(date) {
    this.date = this.activityInfo.find(loggedActivity => loggedActivity.date === date);
    return this.date;
  }

  getMilesWalked(date) {
    this.getActivityInfoByDate(date);
    return Math.round(this.date.numSteps * this.strideLength / 5280 *10) / 10;
  }

  getUserActivityStatForDate(activity, date) {
    this.getActivityInfoByDate(date);
    return this.date[activity];
  }

  getAverageByWeek(activity, date) {
    let dateIndex = this.activityInfo.findIndex((loggedActivity, index) => loggedActivity.date === date);
    let weekArray = this.activityInfo.filter((loggedActivity, index) => (index <= dateIndex && index >= (dateIndex - 6)));
    let average = weekArray.reduce((acc, loggedActivity) => acc += loggedActivity[activity] / 7, 0);
    return Math.round(average);
  }

  findDaysExceededGoal() {
    return this.activityInfo.reduce((acc, loggedActivity) => {
      if (loggedActivity.numSteps > this.dailyStepGoal) {
        acc.push(loggedActivity.date)
      };
      // console.log('ACC', acc);
      return acc;
      }, []);
  }

  findDaysExceededGoalJustDates() {
    // console.log(this.activityInfo.filter(loggedActivity => loggedActivity.numSteps > this.dailyStepGoal));
    return this.activityInfo.filter(loggedActivity => loggedActivity.numSteps > this.dailyStepGoal);
  }



}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
