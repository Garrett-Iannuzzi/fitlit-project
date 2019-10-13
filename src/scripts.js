const randomUser = Math.ceil(Math.random() * 50);
let userRepo = new UserRepo(userData);
let user = new User(userRepo.getUserInfo(randomUser));
let hydrationRepo = new HydrationRepo(hydrationData);
let hydration = new Hydration(hydrationRepo.getUserByID(randomUser));
const sleepRepo = new SleepRepo(sleepData);
const sleep = new Sleep(sleepRepo.getUserById(randomUser));
const activityRepo = new ActivityRepo(activityData);
const activity = new Activity(activityRepo, user);
let date = hydrationData[hydrationData.length - 1].date;

$(document).ready(function () {
  userHandler();
  hydrationHandler();
  sleepHandler()
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

function sleepHandler() {
  $('#span__sleep--hours--js').text(`${sleep.getMetricByDate(date, 'hoursSlept')} hr`);
  $('#span__sleep--quality--js').text(`${sleep.getMetricByDate(date, 'sleepQuality')}`);
  $('#span__sleep--average--hours--js').text(`${sleep.getAvgMetricPerDayAllTime('hoursSlept')}`);
  $('#span__sleep--average--quality--js').text(`${sleep.getAvgMetricPerDayAllTime('sleepQuality')}`);
}

function activityHandler() {
  $('#span__todays--steps--js').text(`${activity.getUserActivityStatForDate('numSteps', date)}`);
  $('#span__todays--minutes--active--js').text(`${activity.getUserActivityStatForDate('minutesActive', date)}`);
}
