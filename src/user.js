class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.address = userInfo.address;
    this.email = userInfo.email;
    this.strideLength = userInfo.strideLength;
    this.dailyStepGoal = userInfo.dailyStepGoal;
    this.friends = userInfo.friends;
    this.friendNames;
    this.friendStepInfo;
  }

  getUserFirstName() {
    let userFirstName = this.name.split(' ')[0];
    return userFirstName;
  }

  findFriendNames(userData) {
    this.friendNames = [];
    this.friends.map(friendId => {
      userData.forEach(person => {
        if (person.id === friendId) {
          let firstName = person.name.split(' ')[0];
          this.friendNames.push(firstName);
        }
      })
    })
    return this.friendNames;
  }

  findFriendSteps(userData, activityData, date) {
    this.findFriendNames(userData);
    this.friendStepInfo = this.friends.reduce((acc, friendId) => {
    let oneFriendsStats = activityData.filter(stat => stat.userID === friendId);
    let index = oneFriendsStats.findIndex(stat => stat.date === date);
    let weekStats = oneFriendsStats.slice(index - 6, index + 1);
    let totalSteps = 0;
    weekStats.forEach(stat => {
      totalSteps += stat.numSteps
      });
    let friend = this.friendNames.shift();
    acc.push({
      'name': friend,
      'weeklySteps': totalSteps
    });
    return acc;
    }, [])
    return this.friendStepInfo
  }

  findFriendStepsOnly() {
    let onlySteps = this.friendStepInfo;
    return onlySteps.map(friend => friend.weeklySteps);
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}
