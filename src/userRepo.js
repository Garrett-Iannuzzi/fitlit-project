class UserRepo {
  constructor(usersData) {
    this.usersData = usersData;
    this.user;
  }

  getUserInfo(userId) {
    this.user = this.usersData.find(user => user.id === userId);
    return this.user;
  }

  getAverageStepGoalAllUsers() {
    let stepGoalAll = this.usersData.reduce((steps, user) => {
      steps += user.dailyStepGoal / this.usersData.length
      return steps
    },0)
    return stepGoalAll
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepo;
}
