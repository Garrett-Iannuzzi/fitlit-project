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











})
