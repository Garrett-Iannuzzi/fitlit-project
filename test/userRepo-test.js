const chai = require('chai');
const expect = chai.expect; 
const UserRepo = require('../src/userRepo');
const sampleUserData = require('../data/sampleUserData');


describe('UserRepo', () => {

  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepo(sampleUserData)
  });

  it('should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('should hold info on users', () => {
    expect(userRepo.userData).to.eql(sampleUserData);
  });



});