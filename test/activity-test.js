const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/activity');
const sampleActivityData = require('../data/sampleActivityData');
const ActivityRepo = require('../src/activityRepo');
const User = require('../src/user');
const UserRepo = require('../src/userRepo');
const sampleUserData = require('../data/sampleUserData');


describe('Activity', () => {

  let activityRepo;
  let activity;
  let userRepo;
  let user;

  beforeEach(() => {
    userRepo = new UserRepo(sampleUserData);
    let userInfo = userRepo.getUserInfo(3);
    user = new User(userInfo);
    activityRepo = new ActivityRepo(sampleActivityData);
    let activityInfo = activityRepo.getUserById(3);
    activity = new Activity(activityInfo, user);

  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should hold single users activity data', () => {
    expect(activity.activityInfo).to.eql([
      { userID: 3,
        date: '2019/06/15',
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33 },
      { userID: 3,
        date: '2019/06/16',
        numSteps: 12304,
        minutesActive: 152,
        flightsOfStairs: 8 },
      { userID: 3,
        date: '2019/06/17',
        numSteps: 4547,
        minutesActive: 97,
        flightsOfStairs: 5 },
      { userID: 3,
        date: '2019/06/18',
        numSteps: 2546,
        minutesActive: 274,
        flightsOfStairs: 26 },
      { userID: 3,
        date: '2019/06/19',
        numSteps: 10961,
        minutesActive: 188,
        flightsOfStairs: 17 },
      { userID: 3,
        date: '2019/06/20',
        numSteps: 5369,
        minutesActive: 129,
        flightsOfStairs: 46 },
      { userID: 3,
        date: '2019/06/21',
        numSteps: 7498,
        minutesActive: 199,
        flightsOfStairs: 13 }
      ]);
  });

  it('should calculate miles walked by the user on a given date', () => {
    expect(activity.getMilesWalked('2019/06/18', user)).to.equal(2.1);
  })

})
