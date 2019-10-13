class ActivityRepo {
  constructor(activityData) {
    this.activityData = activityData;
    this.userInfo;
  }

  getUserById(id) {
    this.userInfo = this.activityData.filter(user => user.userID === id);
    return this.userInfo;
  }

  getAllUserActivityAvgByDate(activity, date) {
    let dateSpecificDatas = this.activityData.filter(loggedActivity =>
      loggedActivity.date === date)
    let totaledUpActivity = dateSpecificDatas.reduce((acc, loggedActivity) =>
      acc += loggedActivity[activity], 0);
    return Math.round(totaledUpActivity / dateSpecificDatas.length);
  }

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepo;
}
