const randomUser = Math.ceil(Math.random() * 50);
const userRepo = new UserRepo(userData);
const user = new User(userRepo.getUserInfo(randomUser));
console.log(user)
const hydrationRepo = new HydrationRepo(hydrationData);
const hydration = new Hydration(hydrationRepo.getUserByID(randomUser));
const sleepRepo = new SleepRepo(sleepData);
const sleep = new Sleep(sleepRepo.getUserById(randomUser));
// const activityRepo = new ActivityRepo(activityData);
// const activity = new Activity(activityRepo.)

$('#span__todays--water').on('load').text(`${hydration.getOuncesPerDayByDate('2019/06/17')}oz`);