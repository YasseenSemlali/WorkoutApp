function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function timeToString(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${hours}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

export function getTotalTime(points) {
  const startTime = points[0].time;
  const endTime = points[points.length - 1].time;
  return endTime - startTime;
}

export function getAvgSpeed(distance, points) {
  const totalTime = getTotalTime(points);
  const kmPerMs = distance / totalTime;
  return (kmPerMs * 3600000).toFixed(2);
}

export function dateToString(startDate) {
  const date = new Date(startDate);
  return date.toDateString();
}
