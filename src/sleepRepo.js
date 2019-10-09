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
