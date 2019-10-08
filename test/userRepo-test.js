const chai = require('chai');
const expect = chai.expect; 
const UserRepo = require('../src/userRepo');
const sampleUserData = require('../data/sampleUserData');


describe('UserRepo', () => {

  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepo(sampleUserData)
  });

  it('should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('should hold info on users', () => {
    expect(userRepo.userData).to.eql(sampleUserData);
  });

  it('should be able to get a user by id', () => {
    expect(userRepo.getUserInfo(3)).to.eql({
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [
        19,
        11,
        42,
        33
      ]
    });
  });

  it('should be able to get average step goal for all users', () => {
    expect(userRepo.getAverageStepGoalAllUsers()).to.equal(6400);
  });
});