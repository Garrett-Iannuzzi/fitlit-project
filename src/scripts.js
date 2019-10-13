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
  $('#span__current--date').text(date);
  userHandler();
  hydrationHandler();
  sleepHandler()
  activityHandler()
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
  $('#span__todays--stairs--js').text(`${activity.getUserActivityStatForDate('flightsOfStairs', date)}`);
  $('#span__todays--minutes--js').text(`${activity.getUserActivityStatForDate('minutesActive', date)}`);

  if (activity.getMilesWalked(date) <= 1) {
    $('#span__distance--miles--js').text(`${activity.getMilesWalked(date)} mile`);
  } else if (activity.getMilesWalked(date) > 1) {
    $('#span__distance--miles--js').text(`${activity.getMilesWalked(date)} miles`);
  }

  $('#span__you--steps--js').text(`${activity.getUserActivityStatForDate('numSteps', date)}`);
  $('#span__them--steps--js').text(`${activityRepo.getAllUserActivityAvgByDate('numSteps', date)}`);
  $('#span__you--stairs--js').text(`${activity.getUserActivityStatForDate('flightsOfStairs', date)}`);
  $('#span__them--stairs--js').text(`${activityRepo.getAllUserActivityAvgByDate('flightsOfStairs', date)}`);
  $('#span__you--minutes--js').text(`${activity.getUserActivityStatForDate('minutesActive', date)}`);
  $('#span__them--minutes--js').text(`${activityRepo.getAllUserActivityAvgByDate('minutesActive', date)}`);
}
