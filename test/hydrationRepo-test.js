const chai = require('chai');
const expect = chai.expect;
const HydrationRepo = require('../src/hydrationRepo');
const sampleHydrationData = require('../data/sampleHydrationData');


describe('HydrationRepo', () => {

  let hydrationRepo;

  beforeEach(() => {
    hydrationRepo = new HydrationRepo(sampleHydrationData);
  });

  it('should be a function', () => {
    expect(HydrationRepo).to.be.a('function');
  });

  it('should hold hydration info for all users', () => {
    expect(hydrationRepo.hydrationData).to.eql(sampleHydrationData);
  });

  it('should be able to isolate hydration info for single user by id', () => {
    expect(hydrationRepo.getUserById(3)).to.eql([
      { userID: 3, date: '2019/06/15', numOunces: 47 },
      { userID: 3, date: '2019/06/16', numOunces: 99 },
      { userID: 3, date: '2019/06/17', numOunces: 28 },
      { userID: 3, date: '2019/06/18', numOunces: 29 },
      { userID: 3, date: '2019/06/19', numOunces: 21 },
      { userID: 3, date: '2019/06/20', numOunces: 23 },
      { userID: 3, date: '2019/06/21', numOunces: 26 },
      { userID: 3, date: '2019/06/22', numOunces: 78 },
      { userID: 3, date: '2019/06/23', numOunces: 35 }
    ])
  })
});
