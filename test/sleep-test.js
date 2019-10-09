const chai = require('chai');
const expect = chai.expect;
const Sleep = require('../src/sleep');
const SleepRepo = require('../src/sleepRepo');
const sampleSleepData = require('../data/sampleSleepData');

describe('Sleep', () => {

  let sleep;
  let sleepRepo;

  beforeEach(() => {
    sleepRepo = new SleepRepo(sampleSleepData);
    let sleepInfo = sleepRepo.getUserById(3);
    sleep = new Sleep(sleepInfo);
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should hold a single users data', () => {
    expect(sleep.sleepInfo).to.eql([
      { userID: 3, date: '2019/06/15', hoursSlept: 10.8, sleepQuality: 4.7 },
      { userID: 3, date: '2019/06/16', hoursSlept: 10.7, sleepQuality: 3.4 },
      { userID: 3, date: '2019/06/17', hoursSlept: 5.3, sleepQuality: 4.9 },
      { userID: 3, date: '2019/06/18', hoursSlept: 9.8, sleepQuality: 2.6 },
      { userID: 3, date: '2019/06/19', hoursSlept: 7.2, sleepQuality: 3.4 },
      { userID: 3, date: '2019/06/20', hoursSlept: 9.4, sleepQuality: 1.2 },
      { userID: 3, date: '2019/06/21', hoursSlept: 8.9, sleepQuality: 3.7 }
    ])
  });

  it('should get average number of hours slept by id', () => {
    expect(sleep.getAvgMetricPerDayAllTime('hoursSlept')).to.equal(8.9);
  });

  it('should get the average sleep quality for a user', () => {
    expect(sleep.getAvgMetricPerDayAllTime('sleepQuality')).to.equal(3.4);
  });

  it('should get hours slept by date', () => {
    expect(sleep.getMetricByDate('2019/06/17', 'hoursSlept')).to.equal(5.3);
  });

  it('should get sleep quality by date', () => {
    expect(sleep.getMetricByDate('2019/06/17', 'sleepQuality')).to.equal(4.9);
  });

  it('should get hours slept each day for a week', () => {
    expect(sleep.getMetricByWeek('2019/06/21', 'hoursSlept')).to.eql([ 10.8, 10.7, 5.3, 9.8, 7.2, 9.4, 8.9 ]);
  });

  it('should get sleep quality each day for a week', () => {
    expect(sleep.getMetricByWeek('2019/06/21', 'sleepQuality')).to.eql([ 4.7, 3.4, 4.9, 2.6, 3.4, 1.2, 3.7 ]);
  });









})
