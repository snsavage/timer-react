export function displayTime(totalSeconds) {
  let units = "";

  totalSeconds = Number(totalSeconds);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor(totalSeconds % 3600 / 60);
  let seconds = Math.floor(totalSeconds % 3600 % 60);

  let hoursDisplay = hours > 0 ? pad(hours) + ":" : "";
  let minutesDisplay = pad(minutes) + ":";
  let secondsDisplay = pad(seconds);

  if(hours > 0) {
    units = hours > 1 ? "hours" : "hour";
  } else if(minutes > 0) {
    units = minutes > 1 ? "minutes" : "minute";
  } else {
    units = seconds > 1 ? "seconds" : "second";
  }

  return hoursDisplay + minutesDisplay + secondsDisplay + " " + units;
}

function pad(number) {
  if(number === 0) { return "00" };
  if(number < 10) { return  "0" + number; }

  return number;
}
