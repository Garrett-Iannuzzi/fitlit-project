class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
  }
}


if (typeof module !== 'undefined') {
  module.exports = User;
}
