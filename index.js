/* Your Code Here */

function createEmployeeRecord(array) {
  const record = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return record;
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeInEventOnDate = this.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEventOnDate = this.timeOutEvents.find(
    (event) => event.date === date
  );

  return (timeOutEventOnDate.hour - timeInEventOnDate.hour) / 100;
}

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  const payRate = this.payPerHour;

  return hoursWorked * payRate;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function calculatePayroll(arrayofEmployeeRecords) {
  return arrayofEmployeeRecords.reduce(function (accum, record) {
    return accum + allWagesFor.call(record);
  }, 0);
}

function findEmployeeByFirstName(arrayofEmployeeRecords, firstNameString) {
  return arrayofEmployeeRecords.find(
    (record) => record.firstName === firstNameString
  );
}
