const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user');
const sampleUserData = require('../data/sampleUserData');
const sampleActivityData = require('../data/sampleActivityData');
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

  it('should have an address', () => {
    expect(user.address).to.equal(
      '85823 Bosco Fork, East Oscarstad MI 85126-5660');
  });

  it('should have an email', () => {
    expect(user.email).to.equal('Elwin.Tromp@yahoo.com');
  });

  it('should have a stride length', () => {
    expect(user.strideLength).to.equal(4.4);
  });

  it('should have a daily step goal', () => {
    expect(user.dailyStepGoal).to.equal(5000);
  });

  it('should have a list of friends', () => {
    expect(user.friends).to.eql([
      2,
      1,
      4
    ]);
  });

  it('should tell us users first name', () => {
    expect(user.getUserFirstName()).to.equal('Herminia');
  });

  it('should find all users friends', () => {
    expect(user.findFriendNames(sampleUserData)).to.eql([
      'Jarvis',
      'Luisa',
      'Mae'
    ]);
  });

  it('should find friends step counts', () => {
    expect(user.findFriendSteps(
      sampleUserData, sampleActivityData, '2019/06/21')).to.eql([
      {'name': 'Jarvis',
        'weeklySteps': 55054},
      {'name': 'Luisa',
        'weeklySteps': 58629},
      {'name': 'Mae',
        'weeklySteps': 60963},
    ]);
    expect(user.findFriendSteps(
      sampleUserData, sampleActivityData, '2019/06/22')).to.eql([
      {'name': 'Jarvis',
        'weeklySteps': 54365},
      {'name': 'Luisa',
        'weeklySteps': 65341},
      {'name': 'Mae',
        'weeklySteps': 61072},
    ]);
  });

  it('should find your friends weekly steps', () => {
    user.findFriendSteps(sampleUserData, sampleActivityData, '2019/06/22');
    expect(user.findFriendStepsOnly()).to.eql([ 54365, 65341, 61072 ]);
  });

  it('should find which friend had the most steps', () => {
    user.findFriendSteps(sampleUserData, sampleActivityData, '2019/06/22');
    expect(user.findFriendStepsOnlyWinner()).to.equal('Luisa')
  });
})
