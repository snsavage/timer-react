export function secondsToMinutes(time_in_seconds) {
  const minutes = time_in_seconds / 60;
  const seconds = pad(time_in_seconds % 60);

  return `${minutes}:${seconds} ${minute_unit(minutes)}`;
}

function pad(number) {
  if(number < 10) { return  "0" + number; }

  return number;
}

function minute_unit(minutes) {
  if(minutes > 1) { return "mins"; }

  return "min";
}
