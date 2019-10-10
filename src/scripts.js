const randomUser = Math.ceil(Math.random() * 50);
let userRepo = new UserRepo(userData);
let user = new User(userRepo.getUserInfo(randomUser));
let hydrationRepo = new HydrationRepo(hydrationData);
let hydration = new Hydration(hydrationRepo.getUserByID(randomUser));


$(document).ready(function () {
    userHandler();
    hydrationHandler();
  })
  

function userHandler() {
  $('#span__user--info--js').text(`${user.getUserFirstName()}`);
  
}

function hydrationHandler() {
  $('#span__todays--water').text(`${hydration.getOuncesPerDayByDate('2019/06/17')}oz`);
}


// const sleepRepo = new SleepRepo(sleepData);
// const sleep = new Sleep(sleepRepo.getUserById(randomUser));
// const activityRepo = new ActivityRepo(activityData);
// const activity = new Activity(activityRepo.)

