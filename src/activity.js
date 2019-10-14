class Activity {
  constructor(activityInfo, user) {
    this.activityInfo = activityInfo;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.date = {};
    // console.log(this.activityInfo);
  }

  getActivityInfoByDate(date) {
    this.date = this.activityInfo.find(function (loggedActivity) {
      return loggedActivity.date === date
    })
  }

  getMilesWalked(date) {
    this.getActivityInfoByDate(date);
    return Math.round(this.date.numSteps * this.strideLength / 5280 * 10) / 10;
  }

  getUserActivityStatForDate(activity, date) {
    this.getActivityInfoByDate(date);
    return this.date[activity];
  }

  getAverageByWeek(activity, date) {
    let dateIndex = this.activityInfo.findIndex((loggedActivity) =>
      loggedActivity.date === date);
    let weekArray = this.activityInfo.filter((loggedActivity, index) =>
      (index <= dateIndex && index >= (dateIndex - 6)));
    let average = weekArray.reduce((acc, loggedActivity) =>
      acc += loggedActivity[activity] / 7, 0);
    return Math.round(average);
  }

  findDaysExceededGoal() {
    return this.activityInfo.reduce((acc, loggedActivity) => {
      if (loggedActivity.numSteps > this.dailyStepGoal) {
        acc.push(loggedActivity.date)
      }
      return acc;
    }, []);
  }

  findInfoForDaysExceededGoal() {
    return this.activityInfo.filter(loggedActivity =>
      loggedActivity.numSteps > this.dailyStepGoal);
  }

  findByHowMuchExceededGoal(date) {
    let exceededs = this.findInfoForDaysExceededGoal();
    let dateInQuestion = exceededs.find(loggedActivity =>
      loggedActivity.date === date);
    return dateInQuestion.numSteps - this.dailyStepGoal;
  }

  findIfGoalExceededByDate(date) {
    this.getActivityInfoByDate(date);
    if (this.date.numSteps > this.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  findStairRecord() {
    return this.activityInfo.reduce((acc, loggedActivity) => {
      if (loggedActivity.flightsOfStairs > acc.flightsOfStairs) {
        acc = loggedActivity
      }
      return acc;
    })
  }


  getThreeDayStepStreak() {
    let threeDayStreaks = this.activityInfo.reduce((acc, stat, index) => {
      if (index < 2) {
        return acc;
      }
       if ((stat.numSteps > this.activityInfo[index - 1].numSteps) && (this.activityInfo[index - 1].numSteps > this.activityInfo[index - 2].numSteps)) {
         acc.push(
           { 'date': this.activityInfo[index - 2].date,
             'numSteps': this.activityInfo[index - 2].numSteps},
           { 'date': this.activityInfo[index - 1].date,
             'numSteps': this.activityInfo[index - 1].numSteps},
           { 'date': this.activityInfo[index].date,
             'numSteps': this.activityInfo[index].numSteps});
       }
       return acc;
     }, []);
     let separatedStreaks = [];
     threeDayStreaks.forEach(dayStat => {
       separatedStreaks.push(threeDayStreaks.splice(0, 3));
     })
     return separatedStreaks;
   }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
