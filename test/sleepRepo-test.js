const chai = require('chai');
const expect = chai.expect;
const SleepRepo = require('../src/sleepRepo');
const sampleSleepData = require('../data/sampleSleepData');


describe ('SleepRepo', () => {

  let sleepRepo;

  beforeEach(() => {
    sleepRepo = new SleepRepo(sampleSleepData)
  });

  it('should be a function', () => {
    expect(SleepRepo).to.be.a('function');
  });

  it('should hold sleep info for all users', () => {
    expect(sleepRepo.sleepData).to.equal(sampleSleepData);
  });

  it('should get a single users info', () => {
    expect(sleepRepo.getUserById(3)).to.eql([
      { userID: 3, date: "2019/06/15", hoursSlept: 10.8, sleepQuality: 4.7 },
      { userID: 3, date: "2019/06/16", hoursSlept: 10.7, sleepQuality: 3.4 },
      { userID: 3, date: '2019/06/17', hoursSlept: 5.3, sleepQuality: 4.9 },
      { userID: 3, date: '2019/06/18', hoursSlept: 9.8, sleepQuality: 2.6 },
      { userID: 3, date: '2019/06/19', hoursSlept: 7.2, sleepQuality: 3.4 },
      { userID: 3, date: '2019/06/20', hoursSlept: 9.4, sleepQuality: 1.2 },
      { userID: 3, date: '2019/06/21', hoursSlept: 8.9, sleepQuality: 3.7 }
    ]);
  });

  it('should get average sleep quality for all users', () => {
    expect(sleepRepo.getAvgSleepQuality()).to.equal(3.13);
  });

  it('should get all users who have a sleep quality above three', () => {
    
  });

  it('should get user with most hours slept by day', () => {
    
  });





})