class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.address = userInfo.address;
    this.email = userInfo.email;
    this.strideLength = userInfo.strideLength;
    this.dailyStepGoal = userInfo.dailyStepGoal;
    this.friends = userInfo.friends;
    this.friendNames;
    this.friendStepInfo;
  }

  getUserFirstName() {
    let userFirstName = this.name.split(' ')[0];
    return userFirstName;
  }

  findFriendNames(userData) {
    this.friendNames = [];
    this.friends.map(friendId => {
      userData.forEach(person => {
        if (person.id === friendId) {
          let firstName = person.name.split(' ')[0];
          this.friendNames.push(firstName);
        }
      })
    })
    return this.friendNames;
  }

  findFriendSteps(userData, activityData, date) {
    this.findFriendNames(userData);
    this.friendStepInfo = this.friends.reduce((acc, friendId) => {
      let oneFriendsStats = activityData.filter(stat =>
        stat.userID === friendId);
      let index = oneFriendsStats.findIndex(stat => stat.date === date);
      let weekStats = oneFriendsStats.slice(index - 6, index + 1);
      let totalSteps = 0;
      weekStats.forEach(stat => {
        totalSteps += stat.numSteps
      });
      let friend = this.friendNames.shift();
      acc.push({
        'name': friend,
        'weeklySteps': totalSteps
      });
      return acc;
    }, [])
    return this.friendStepInfo
  }

  findFriendStepsOnly() {
    let onlySteps = this.friendStepInfo;
    return onlySteps.map(friend => friend.weeklySteps);
  }

  findFriendStepsOnlyWinner() {
    let stepWinner = this.friendStepInfo.sort((a, b) =>
      b.weeklySteps - a.weeklySteps);
    return stepWinner[0].name
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}





// it('should be able to get a customers first name', () => {
//   expect(admin.getCustomerFirstName(1)).to.equal('Leatha');
// });

// it('should be able to get bookings for a customer', () => {
//   expect(admin.getCustomerBookingsDetails(1)).to.eql([
//     {
//       id: 1572293130156,
//       userID: 1,
//       date: "2019/11/03",
//       roomNumber: 18,
//       roomServiceCharges: [ ]
//       },
//       {
//       id: 1572293130159,
//       userID: 1,
//       date: "2019/11/12",
//       roomNumber: 8,
//       roomServiceCharges: [ ]
//       },
//       {
//       id: 1572293130159,
//       userID: 1,
//       date: "2019/10/29",
//       roomNumber: 10,
//       roomServiceCharges: [ ]
//       },
//       {
//       id: 1572293130159,
//       userID: 1,
//       date: "2019/11/15",
//       roomNumber: 4,
//       roomServiceCharges: [ ]
//       },
//       {
//       id: 1572293130160,
//       userID: 1,
//       date: "2019/13/06",
//       roomNumber: 7,
//       roomServiceCharges: [ ]
//       },
//       {
//       id: 1572293130160,
//       userID: 1,
//       date: "2019/11/22",
//       roomNumber: 1,
//       roomServiceCharges: [ ]
//       }
//   ]);
// });

// it('should be able to get a customers revenue', () => {
//   expect(admin.getCustomerRevenue(1)).to.equal(2274.61)
// });



// getCustomerFirstName(customerId) {
//   let customer = this.customer.find(customer => customer.id === customerId);
//   let firstName = customer.name.split(' ')[0];
//   return firstName
// }

// getCustomerBookingsDetails(customerId) {
//   return this.bookings.filter(booking => booking.userID === customerId);
// }

// getCustomerRevenue(customerId) {
//   let customerBookings = this.getCustomerBookingsDetails(customerId);
//   let totalRevenue = customerBookings.reduce((total, booking) => {
//     this.rooms.forEach(room => {
//       if (room.number === booking.roomNumber) {
//         total += room.costPerNight
//       }
//     })
//     return total
//   }, 0)
//   return Number(totalRevenue)
// }
// getTotalRoomsAvailableToday(date) {
//   let roomsWithCustomers = this.bookings.reduce((acc, room) => {
//     if (date === room.date) {
//       acc.push(room);
//     }
//     return acc;
//   }, []).length;
//   return Number(this.rooms.length - roomsWithCustomers)
// }

// getTotalRevenueToday(date) {
//   let bookingsByDate = this.bookings.filter(booking => booking.date === date);
//   let totalRev = bookingsByDate.reduce((acc, room) => {
//     this.rooms.forEach(item => {
//       if(item.number === room.roomNumber)
//         acc += item.costPerNight
//       })
//       return acc
//   }, 0);
//   return Number(totalRev.toFixed(2))
// }

// getPercentRoomsOccupiedByDate(date) {
//   let bookingsByDate = this.bookings.filter(booking => booking.date === date);
//   let percentOccupied = Number((bookingsByDate.length / 50).toFixed(2))
//   return percentOccupied
// }

// import chai from 'chai';
// const expect = chai.expect;

// import Hotel from '../src/Hotel';
// import Admin from '../src/Admin';
// import sampleCustomerData from './sample-customerData';
// import sampleBookingsData from './sample-bookingsData';
// import sampleRoomsData from './sample-roomsData';

// let hotel;
// let admin;

// describe('Admin', function() {

//   beforeEach(() => {
//     hotel = new Hotel(sampleCustomerData, sampleRoomsData, sampleBookingsData, '2019/11/03');
//     admin = new Admin(sampleCustomerData, sampleRoomsData, sampleBookingsData, '2019/11/03');
//   });

//   it('should be a function', function() {
//     expect(Admin).to.be.a('function');
//   });

//   describe('Admin Properties', () => {
//     it('should have information for all users', () => {
//       expect(admin.customerData).to.eql(sampleCustomerData);
//     });
  
//     it('should have information for all rooms', () => {
//       expect(admin.rooms).to.eql(sampleRoomsData);
//     });
  
//     it('should have information for all bookings', () => {
//       expect(admin.bookings).to.eql(sampleBookingsData);
//     });

//     it('should have the current date', () => {
//       expect(admin.date).to.equal('2019/11/03');
//     });
//   });

//   it('should be able to get total rooms available by current date', () => {
//     expect(admin.getTotalRoomsAvailableToday('2019/11/03')).to.equal(23);
//   });

//   it('should be able to get total percent of occupied rooms by current date', () => {
//     expect(admin.getPercentRoomsOccupiedByDate('2019/11/03')).to.equal(.04);
//   });

//   it('should be able to get total revenue by current date', () => {
//     expect(admin.getTotalRevenueToday('2019/11/03')).to.equal(954.29);
//   });

//   it('should be able to get a customers first name', () => {
//     expect(admin.getCustomerFirstName(1)).to.equal('Leatha');
//   });