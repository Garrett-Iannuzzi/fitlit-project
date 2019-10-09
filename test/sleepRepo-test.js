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






})