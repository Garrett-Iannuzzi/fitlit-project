const randomUser = Math.ceil(Math.random() * 50);
let userRepo = new UserRepo(userData);
let user = new User(userRepo.getUserInfo(randomUser));
let hydrationRepo = new HydrationRepo(hydrationData);
let hydration = new Hydration(hydrationRepo.getUserByID(randomUser));
let date = hydrationData[hydrationData.length - 1].date;

$(document).ready(function () {
  userHandler();
  hydrationHandler();
  $('#span__current--date').text(date);
})

function userHandler() {
  $('#span__user--name--js').text(`${user.getUserFirstName()}`);
  $('#span__user--address--js').text(`${user.address}`);
  $('#span__user--email--js').text(`${user.email}`);
  $('#span__user--stride--js').text(`${user.strideLength}`);
  $('#span__user--friends--js').text(`${user.friends.length}`);
  $('#span__user--goal--js').text(`${user.dailyStepGoal}`);
  $('#span__user--average--js').text(`${userRepo.getAverageStepGoalAllUsers()}`);
}

function hydrationHandler() {
  $('#span__todays--water').text(`${hydration.getOuncesPerDayByDate(date)}oz`);
}


// const sleepRepo = new SleepRepo(sleepData);
// const sleep = new Sleep(sleepRepo.getUserById(randomUser));
// const activityRepo = new ActivityRepo(activityData);
// const activity = new Activity(activityRepo.)

