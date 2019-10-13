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
    let hydrationInfo = hydrationRepo.getUserById(3);
    hydration = new Hydration(hydrationInfo);
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should hold a single users data', () => {
    expect(hydration.hydrationInfo).to.eql([
      { userID: 3, date: '2019/06/15', numOunces: 47 },
      { userID: 3, date: '2019/06/16', numOunces: 99 },
      { userID: 3, date: '2019/06/17', numOunces: 28 },
      { userID: 3, date: '2019/06/18', numOunces: 29 },
      { userID: 3, date: '2019/06/19', numOunces: 21 },
      { userID: 3, date: '2019/06/20', numOunces: 23 },
      { userID: 3, date: '2019/06/21', numOunces: 26 },
      { userID: 3, date: '2019/06/22', numOunces: 78 },
      { userID: 3, date: '2019/06/23', numOunces: 35 }
    ]);
  });

  it('should be able to average users daily hydration', () => {
    expect(hydration.getAllTimeDailyHydrationAvg()).to.equal(43);
  })

  it('should be able to get ounces consumed by date', () => {
    expect(hydration.getOuncesPerDayByDate('2019/06/17')).to.equal(28);
  })

  it('should be able to get ounces consumed per day by week', () => {
    expect(hydration.getOuncesPerDayByWeek('2019/06/21')).to.eql([47, 99, 28,
      29, 21, 23, 26]);
    expect(hydration.getOuncesPerDayByWeek('2019/06/23')).to.eql([28, 29, 21,
      23, 26, 78, 35]);
  })

});
