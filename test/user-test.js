const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user');
const sampleUserData = require('../data/sampleUserData');
const UserRepo = require('../src/userRepo');

describe('User', () => {

  let userRepo;
  let user;

  beforeEach(() => {
    userRepo = new UserRepo(sampleUserData);
    let userInfo = userRepo.getUserInfo(3);
    user = new User(userInfo);
  });

  it('should have an id ', () => {
    expect(user.id).to.equal(3);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Herminia Witting');
  });
  //
  // it('should have a ', () => {
  //   expect(user.).to.equal();
  // });
  //
  // it('should have a ', () => {
  //   expect(user.).to.equal();
  // });
  //
  // it('should have a ', () => {
  //   expect(user.).to.equal();
  // });
  //
  // it('should have a ', () => {
  //   expect(user.).to.equal();
  // });
  //
  // it('should have a ', () => {
  //   expect(user.).to.equal();
  // });

})
