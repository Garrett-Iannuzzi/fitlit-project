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
    return this.friends.reduce((acc, friendId) => {
    let oneFriendsStats = activityData.filter(stat => stat.userID === friendId);
    let index = oneFriendsStats.findIndex(stat => stat.date === date);
    let weekStats = oneFriendsStats.slice(index - 6, index + 1);
    let totalSteps = 0;
    let friend;
    friend = '';
    weekStats.forEach(stat => {
      totalSteps += stat.numSteps
      });
    this.friendNames.forEach(name => {
      friend = name;
    });
    acc.push({
      'name': friend,
      'weeklySteps': totalSteps
    });
    return acc;
    }, [])
  }


}

if (typeof module !== 'undefined') {
  module.exports = User;
}
