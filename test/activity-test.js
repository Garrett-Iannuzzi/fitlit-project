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
        flightsOfStairs: 13 },
      { userID: 3,
        date: '2019/06/22',
        numSteps: 11342,
        minutesActive: 53,
        flightsOfStairs: 17 },
      { userID: 3,
        date: '2019/06/23',
        numSteps: 4665,
        minutesActive: 219,
        flightsOfStairs: 9 },
      { userID: 3,
        date: '2019/06/24',
        numSteps: 1665,
        minutesActive: 219,
        flightsOfStairs: 9 },
      { userID: 3,
        date: '2019/06/25',
        numSteps: 4665,
        minutesActive: 219,
        flightsOfStairs: 9 },
      { userID: 3,
        date: '2019/06/26',
        numSteps: 14665,
        minutesActive: 219,
        flightsOfStairs: 9 }
    ]);
  });

  it('should be able to organize all activity info by a specific date', () => {
    activity.getActivityInfoByDate('2019/06/17');
    expect(activity.date).to.eql({
      userID: 3,
      date: '2019/06/17',
      numSteps: 4547,
      minutesActive: 97,
      flightsOfStairs: 5 });
    expect(activity.date.numSteps).to.equal(4547);
  });

  it('should calculate miles walked by the user on a given date', () => {
    expect(activity.getMilesWalked('2019/06/18')).to.equal(2.1);
  });

  it('should know how many minutes a user was active on a given date', () => {
    expect(activity.getUserActivityStatForDate('minutesActive', '2019/06/17')).
      to.equal(97);
  });

  it('should know how many step a user took on a given date', () => {
    expect(activity.getUserActivityStatForDate('numSteps', '2019/06/21')).
      to.equal(7498);
  })

  it('should calculate a users average mins of activity for the week', () => {
    expect(activity.getAverageByWeek('minutesActive', '2019/06/21')).
      to.equal(165);
    expect(activity.getAverageByWeek('minutesActive', '2019/06/23')).
      to.equal(166);
  })

  it('should get info for which days a user exceeded step goal', () => {
    expect(activity.findInfoForDaysExceededGoal()).to.eql([
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 3,
        "date": "2019/06/16",
        "numSteps": 12304,
        "minutesActive": 152,
        "flightsOfStairs": 8
      },
      {
        "userID": 3,
        "date": "2019/06/19",
        "numSteps": 10961,
        "minutesActive": 188,
        "flightsOfStairs": 17
      },
      {
        "userID": 3,
        "date": "2019/06/20",
        "numSteps": 5369,
        "minutesActive": 129,
        "flightsOfStairs": 46
      },
      {
        "userID": 3,
        "date": "2019/06/21",
        "numSteps": 7498,
        "minutesActive": 199,
        "flightsOfStairs": 13
      },
      {
        "userID": 3,
        "date": "2019/06/22",
        "numSteps": 11342,
        "minutesActive": 53,
        "flightsOfStairs": 17
      },
      {
        "userID": 3,
        "date": "2019/06/26",
        "numSteps": 14665,
        "minutesActive": 219,
        "flightsOfStairs": 9
      }
    ])
  })

  it('should calculate just the dates a user exceeded step goal', () => {
    expect(activity.findDaysExceededGoal()).to.eql([
      '2019/06/15',
      '2019/06/16',
      '2019/06/19',
      '2019/06/20',
      '2019/06/21',
      '2019/06/22',
      '2019/06/26'
    ])
  })

  it('should calculate if a user exceeded goal on given date', () => {
    expect(activity.findIfGoalExceededByDate('2019/06/19')).to.equal(true);
    expect(activity.findIfGoalExceededByDate('2019/06/17')).to.equal(false);
  })

  it('should be able to find a users all time stair climbing record', () => {
    expect(activity.findStairRecord()).to.eql({
      "userID": 3,
      "date": "2019/06/20",
      "numSteps": 5369,
      "minutesActive": 129,
      "flightsOfStairs": 46
    })
  })

  it('should calculate by how much a user exceeded their goal', () => {
    expect(activity.findByHowMuchExceededGoal('2019/06/20')).to.equal(369);
  })

  it('should calculate step streak of three days', () => {
    expect(activity.getThreeDayStepStreak('numSteps')).to.eql([
      [ { date: '2019/06/20', numSteps: 5369 },
        { date: '2019/06/21', numSteps: 7498 },
        { date: '2019/06/22', numSteps: 11342 } ],
      [ { date: '2019/06/24', numSteps: 1665 },
        { date: '2019/06/25', numSteps: 4665 },
        { date: '2019/06/26', numSteps: 14665 } ]
      ]);
  })

  it('should calculate activity minutes streak of three days', () => {
    expect(activity.getThreeDayStepStreak('minutesActive')).to.eql([]);
  })

  it('should organize daily activity for each day in a week', () => {
    expect(activity.getWeeklyActivityStats('numSteps', '2019/06/22')).to.eql(
      [ 12304, 4547, 2546, 10961, 5369, 7498, 11342 ])
  });

  it('should get only the dates of a step streak', () => {
    activity.getThreeDayStepStreak('numSteps')
    expect(activity.getStepStreakDatesOnly('numSteps')).to.eql([ '2019/06/24', '2019/06/25', '2019/06/26' ])
  });

})
