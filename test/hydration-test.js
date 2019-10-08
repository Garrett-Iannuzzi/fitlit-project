const chai = require('chai');
const expect = chai.expect;
const Hydration = require('../src/hydration');
const HydrationRepo = require('../src/hydrationRepo');
const sampleHydrationData = require('../data/sampleHydrationData');


describe('Hydration', () => {

  let hydrationRepo;
  let hydration;

  beforeEach(() => {
    hydrationRepo = new HydrationRepo(sampleHydrationData);
    let hydrationInfo = hydrationRepo.getUserByID(3);
    hydration = new Hydration(hydrationInfo);
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should hold a single users data', () => {
    expect(hydration.hydrationInfo).to.eql([
      { userID: 3, date: '2019/06/15', numOunces: 47 },
      { userID: 3, date: '2019/06/16', numOunces: 99 },
      { userID: 3, date: '2019/06/17', numOunces: 28 }
      ]);
});

  it('should be able to average users daily hydration', () => {
    expect(hydration.getAllTimeDailyHydrationAvg()).to.equal(58);
  })

});
