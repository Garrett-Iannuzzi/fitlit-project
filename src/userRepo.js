class UserRepo {
  constructor(userData) {
    this.userData = userData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepo;
}