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

  getAvgSleepQualityAboveThree(date) {
    let userIds = this.getAllUserIds()
    return userIds.reduce((finalAcc, id) => {
      let thisUsersStuff = this.sleepData.reduce((acc, stat) => {
        if (stat.userID === id) {
          acc.push(stat)
        }
        return acc
      }, [])
      let index = thisUsersStuff.findIndex(stat => stat.date === date);
      let justThisWeek = thisUsersStuff.slice(index - 6, index + 1);
      let fakeAcc = 0;
      let userId = 0;
      justThisWeek.forEach(stat => {
        fakeAcc += stat.sleepQuality / 7;
        userId = stat.userID
      })
      if (fakeAcc > 3) {
        finalAcc.push(userId)
      }
      return finalAcc
    }, [])
  }

  getAllUserIds() {
    return this.sleepData.reduce((acc, stat) => {
      if (!acc.includes(stat.userID)) {
        acc.push(stat.userID)
      }
      return acc
    }, []);
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
