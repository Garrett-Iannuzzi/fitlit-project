const chai = require('chai');
const expect = chai.expect;
const ActivityRepo = require('../src/activityRepo');
const sampleActivityData = require('../data/sampleActivityData');


describe('ActivityRepo', () => {

  let activityRepo;

  beforeEach(() => {
    activityRepo = new ActivityRepo(sampleActivityData);
  });

  it('should be a function', () => {
    expect(ActivityRepo).to.be.a('function');
  });

  it('should hold all users activity data', () => {
    expect(activityRepo.activityData).to.equal(sampleActivityData);
  });

  it('should be able to get activity data for single user by id', () => {
    expect(activityRepo.getUserById(3)).to.eql([
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

  it('should be able to get all users avg step by date', () => {
    expect(activityRepo.getAllUserActivityAvgByDate('numSteps', '2019/06/15')).
      to.equal(6027);
  });

  it('should be able to get all users avg flights of stair by date', () => {
    expect(activityRepo.getAllUserActivityAvgByDate('flightsOfStairs',
      '2019/06/17')).to.equal(15);
  });

  it('should be able to get all users avg active minutes by date', () => {
    expect(activityRepo.getAllUserActivityAvgByDate('minutesActive',
      '2019/06/17')).to.equal(111);
  });
});
