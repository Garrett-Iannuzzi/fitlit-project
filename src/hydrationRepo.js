class HydrationRepo {
  constructor (hydrationData) {
    this.hydrationData = hydrationData;
    this.userInfo;
  }

  getUserById(id) {
    this.userInfo = this.hydrationData.filter(user => user.userID === id);
    return this.userInfo;
  }

}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepo;
}
