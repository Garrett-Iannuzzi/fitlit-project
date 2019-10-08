class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.address = userInfo.address;
    this.email = userInfo.email;
    this.strideLength = userInfo.strideLength;
    this.dailyStepGoal = userInfo.dailyStepGoal;
    this.friends = userInfo.friends;
  }

  getUserFirstName() {
    let userFirstName = this.name.split(' ')[0];
    return userFirstName;
  }

}


if (typeof module !== 'undefined') {
  module.exports = User;
}
