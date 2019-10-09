class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
    this.userInfo;
  }

  getUserById(id) {
    this.userInfo = this.sleepData.filter(user => user.userID === id);
    return this.userInfo;
  }

  getAvgSleepQuality() {
    let avgSleepQuality = this.sleepData.reduce((sleepScore, user) => {
      sleepScore += user.sleepQuality / this.sleepData.length
      return sleepScore
    }, 0)
    return Number(avgSleepQuality.toFixed(2))
  }

  getAvgSleepQualityAboveThree() {
    // need a date 
      //will you be able to iterate over that date veriable?
    // need to get 7 days from that date
    // need to add sleep quality for every user
    // need to compare that sleep quality avg to 3
    //
  }

  getMostHoursSleptByDay(date) {
    let hoursByDate = this.sleepData.filter(user => user.date === date)
    let mostHoursSlept = hoursByDate.sort((a, b) => {
      return b.hoursSlept - a.hoursSlept
    });
    if (mostHoursSlept[0].hoursSlept === mostHoursSlept[1].hoursSlept) {
      return mostHoursSlept[0].userID && mostHoursSlept[1].userID
    } else {
      return mostHoursSlept[0].userID
    }
  }

}

if (typeof module !== 'undefined') {
  module.exports = SleepRepo;
}
