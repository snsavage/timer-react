export function convertTime(input) {
  const units = input
    .toString()
    .split(":", 3)
    .map(e => parseInt(e, 10))
    .reverse();

  let total = 0;

  if (!units.every(e => Number.isInteger(e))) { return 0 };

  total = total + parseInt(units[0], 10);
  if (units[1]) { total = total + parseInt(units[1], 10) * 60 };
  if (units[2]) { total = total + parseInt(units[2], 10) * 3600 };

  return total;
}

export function displayTimeNoUnits(totalSeconds) {
  const defaultValue = "00:00:00";

  if (isNaN(totalSeconds)) { return defaultValue };
  if (totalSeconds === 0) { return defaultValue };

  totalSeconds = Number(totalSeconds);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor(totalSeconds % 3600 / 60);
  let seconds = Math.floor(totalSeconds % 3600 % 60);

  let hoursDisplay = pad(hours) + ":";
  let minutesDisplay = pad(minutes) + ":";
  let secondsDisplay = pad(seconds);

  return hoursDisplay + minutesDisplay + secondsDisplay;
}

export function displayTime(totalSeconds) {
  const defaultValue = "00:00:00";

  if (isNaN(totalSeconds)) { return defaultValue };
  if (totalSeconds === 0) { return defaultValue };

  let units = "";

  totalSeconds = Number(totalSeconds);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor(totalSeconds % 3600 / 60);
  let seconds = Math.floor(totalSeconds % 3600 % 60);

  let hoursDisplay = hours > 0 ? pad(hours) + ":" : "";
  let minutesDisplay = pad(minutes) + ":";
  let secondsDisplay = pad(seconds);

  if(hours > 0) {
    units = hours > 1 ? "hr" : "hr";
  } else if(minutes > 0) {
    units = minutes > 1 ? "min" : "min";
  } else {
    units = seconds > 1 ? "sec" : "sec";
  }

  return hoursDisplay + minutesDisplay + secondsDisplay + " " + units;
}

function pad(number) {
  if(number === 0) { return "00" };
  if(number < 10) { return  "0" + number; }

  return number;
}
