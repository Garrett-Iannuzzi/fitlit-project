const chai = require('chai');
const expect = chai.expect;
const HydrationRepo = require('../src/hydrationRepo');
const sampleHydrationData = require('../data/sampleHydrationData');


describe('UserRepo', () => {

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
    expect(hydrationRepo.getUserByID(3)).to.eql([{
      "userID": 3,
      "date": "2019/06/15",
      "numOunces": 47
    }, {
      "userID": 3,
      "date": "2019/06/16",
      "numOunces": 99
    }, {
      "userID": 3,
      "date": "2019/06/17",
      "numOunces": 28
    }])
  })
});
