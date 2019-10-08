class UserRepo {
  constructor(userData) {
    this.userData = userData;
    this.user;
  }

  getUserInfo(userId) {
    this.user = this.userData.find(user => user.id === userId);
    return this.user;
  }
  
  getAverageStepGoalAllUsers() {
    let stepGoalAll = this.userData.reduce((steps, user) => {
      steps += user.dailyStepGoal / this.userData.length
      return steps
    },0)
    return stepGoalAll
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepo;
}