const randomUser = Math.ceil(Math.random() * 50);
const userRepo = new UserRepo(userData);
const user = new User(userRepo.getUserInfo(randomUser));
const hydrationRepo = new HydrationRepo(hydrationData);
const hydration = new Hydration(hydrationRepo.getUserById(randomUser));
const sleepRepo = new SleepRepo(sleepData);
const sleep = new Sleep(sleepRepo.getUserById(randomUser));
const activityRepo = new ActivityRepo(activityData);
const activity = new Activity(activityRepo.getUserById(randomUser), user);
const date = hydrationData[hydrationData.length - 1].date;
const hydrationChart = hydration.getOuncesPerDayByWeek(date);
const sleepQualityChart = sleep.getMetricByWeek(date, 'sleepQuality');
const sleepHoursChart = sleep.getMetricByWeek(date, 'hoursSlept');
const weeklyStepsChart = activity.getWeeklyActivityStats('numSteps', date);
const weeklyStairsChart = activity.getWeeklyActivityStats('flightsOfStairs', date);
const weeklyMinutesChart = activity.getWeeklyActivityStats('minutesActive', date);
const weeklyStepsVsFriends = user.findFriendSteps(userData, activityData, date);

$(document).ready(function () {
  $('#span__current--date').text(date);
  userHandler();
  hydrationHandler();
  sleepHandler();
  activityHandler();
})



function userHandler() {
  $('#span__user--name--js').text(`${user.getUserFirstName()}`);
  $('#span__user--address--js').text(`${user.address}`);
  $('#span__user--email--js').text(`${user.email}`);
  $('#span__user--stride--js').text(`${user.strideLength}`);
  $('#span__user--friends--js').text(`${user.friends.length}`);
  $('#span__user--goal--js').text(`${user.dailyStepGoal}`);
  $('#span__user--average--js').text(`${userRepo.getAverageStepGoalAllUsers()}`);
  // user.findFriendNames(userData);
}

function hydrationHandler() {
  $('#span__todays--water').text(`${hydration.getOuncesPerDayByDate(date)}oz`);
}

function sleepHandler() {
  $('#span__sleep--hours--js').text(`${sleep.getMetricByDate(date, 'hoursSlept')} hr`);
  $('#span__sleep--quality--js').text(`${sleep.getMetricByDate(date, 'sleepQuality')}`);
  $('#span__sleep--average--hours--js').text(`${sleep.getAvgMetricPerDayAllTime('hoursSlept')}`);
  $('#span__sleep--average--quality--js').text(`${sleep.getAvgMetricPerDayAllTime('sleepQuality')}`);
  $('#span__sleep--status--js').text(`${sleep.getUserSleepStatus(date)}`);
  updateSleepyImg()
}

function updateSleepyImg() {
  if (sleep.wellRested === true) {
    $('#sleepy__img--js').attr('src', '../Images/wake-up.png');
  } else {
    $('#sleepy__img--js').attr('src', '../Images/tired.png');
  }
}

function activityHandler() {
  $('#span__todays--steps--js').text(`${activity.getUserActivityStatForDate('numSteps', date)}`);
  $('#span__todays--stairs--js').text(`${activity.getUserActivityStatForDate('flightsOfStairs', date)}`);
  $('#span__todays--minutes--js').text(`${activity.getUserActivityStatForDate('minutesActive', date)}`);
  displayMilesWalked(date);
  displayActivityTable();
}

function displayMilesWalked(date) {
  let milesWalked = activity.getMilesWalked(date);
  if (milesWalked <= 1) {
    $('#p__distance--miles--js').text(`${milesWalked} mile`);
  } else if (milesWalked > 1) {
    $('#p__distance--miles--js').text(`${milesWalked} miles`);
  }
}

function displayActivityTable() {
  $('#td__user--steps--js').text(`${activity.getUserActivityStatForDate('numSteps', date)}`);
  $('#td__others--steps--js').text(`${activityRepo.getAllUserActivityAvgByDate('numSteps', date)}`);
  $('#td__user--stairs--js').text(`${activity.getUserActivityStatForDate('flightsOfStairs', date)}`);
  $('#td__others--stairs--js').text(`${activityRepo.getAllUserActivityAvgByDate('flightsOfStairs', date)}`);
  $('#td__user--minutes--js').text(`${activity.getUserActivityStatForDate('minutesActive', date)}`);
  $('#td__others--minutes--js').text(`${activityRepo.getAllUserActivityAvgByDate('minutesActive', date)}`);
}

let userHydrationByWeekChart = new Chart($('#hydration__by--week--chart--js'), {
    type: 'bar',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: "Oz's on Each Day",
        backgroundColor: ["#E102F9", "#C5FF8C", "#FFE74C", "#47CEED", "#FF631C", "#E0FF19", "#D47FFF"],
        hoverBackgroundColor: "white",
        data: hydrationChart,
        }]
      },
      options: {
        legend: {
          labels: {
              fontColor: "white",
              fontSize: 18,
          },
        },
        title: {
          fontColor: "white",
          display: true,
          text: 'Your Water Intake',
          fontSize: 20,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 15,
                beginAtZero: true
                }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
                fontSize: 15,
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    }
});

let usersleepQualityByWeekChart = new Chart($('#sleep__by--week--quality--js'), {
  type: 'line',
  data: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [{
      label: "Sleep Quality Score",
      pointBackgroundColor: ["#E102F9", "#C5FF8C", "#FFE74C", "#47CEED", "#FF631C", "#E0FF19", "#D47FFF"],
      data: sleepQualityChart,
      backgroundColor: "gainsboro",
      pointRadius: 8,
        
      }]
    },
    options: {
      legend: {
        labels: {
            fontColor: "white",
            fontSize: 25,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "white",
            fontSize: 15,
                  beginAtZero: true
              }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 15,
            }
          }]
      },
      responsive: true,
      maintainAspectRatio: false,
  }
});

let usersleepHoursByWeekChart = new Chart($('#sleep__week--hours--js'), {
  type: 'line',
  data: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [{
      label: "Hours Slept",
      pointBackgroundColor: ["#E102F9", "#C5FF8C", "#FFE74C", "#47CEED", "#FF631C", "#E0FF19", "#D47FFF"],
      data: sleepHoursChart,
      backgroundColor: "gainsboro",
      pointRadius: 8,
        
      }]
    },
    options: {
      legend: {
        labels: {
            fontColor: "white",
            fontSize: 25,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "white",
            fontSize: 15,
                  beginAtZero: true
              }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 15,
            }
          }]
      },
      responsive: true,
      maintainAspectRatio: false,
  }
});
  
  let stepsByWeekChart = new Chart($('#chart__weekly--steps--js'), {
    type: 'line',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: "Steps Per Day",
        hoverBackgroundColor: "white",
        borderColor: "mediumspringgreen",
        borderWidth: 3,
        lineTension: 0,
        pointBorderWidth: 5,
        data: weeklyStepsChart,
       }]
      },
      options: {
        legend: {
          labels: {
              fontColor: "white",
              fontSize: 18,
          },
        },
        title: {
          fontColor: "white",
          display: true,
          text: 'Weekly Steps Totals',
          fontSize: 25,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 25,
                 beginAtZero: true
                }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
                fontSize: 20,
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    }
});
  
let stairsByWeekChart = new Chart($('#chart__weekly--stairs--js'), {
    type: 'line',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: "Flights of Stairs Per Day",
        hoverBackgroundColor: "white",
        borderColor: "magenta",
        borderWidth: 3,
        lineTension: 0,
        pointBorderWidth: 5,
        data: weeklyStairsChart,
        }]
      },
      options: {
        legend: {
          labels: {
              fontColor: "white",
              fontSize: 18,
          },
        },
        title: {
          fontColor: "white",
          display: true,
          text: 'Weekly Stairs Totals',
          fontSize: 25,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 25,
                    beginAtZero: true
                }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
                fontSize: 20,
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    }
});

let minutesByWeekChart = new Chart($('#chart__weekly--minutes--js'), {
    type: 'line',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: "Minutes of Activity Per Day",
        hoverBackgroundColor: "white",
        borderColor: "deepskyblue",
        borderWidth: 3,
        lineTension: 0,
        pointBorderWidth: 5,
        data: weeklyMinutesChart,
        }]
      },
      options: {
        legend: {
          labels: {
              fontColor: "white",
              fontSize: 18,
          },
        },
        title: {
          fontColor: "white",
          display: true,
          text: 'Weekly Activity Totals',
          fontSize: 25,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 25,
                    beginAtZero: true
                }
            }],
            xAxes: [{
              ticks: {
                fontColor: "white",
                fontSize: 20,
              }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    }
});

let namesForStepRace = user.findFriendNames(userData);
let stepsForStepRace = user.findFriendStepsOnly();
let weeklyStepsVsFriendsChart = new Chart($('#step__chart--friends--js'), {
  type: 'bar',
  data: {
    labels: namesForStepRace,
    datasets: [{
      label: "Steps",
      hoverBackgroundColor: "white",
      borderColor: "deepskyblue",
      borderWidth: 3,
      lineTension: 0,
      pointBorderWidth: 5,
      data: stepsForStepRace,
      }]
    },
    options: {
      legend: {
        labels: {
            fontColor: "white",
            fontSize: 18,
        },
      },
      title: {
        fontColor: "white",
        display: true,
        text: 'Step Race',
        fontSize: 35,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "white",
            fontSize: 15,
                  beginAtZero: true
              }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 18,
            }
          }]
      },
      responsive: true,
      maintainAspectRatio: false,
  }
});

