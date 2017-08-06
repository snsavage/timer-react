// export function totalDuration(playlist) {
//   return playlist.reduce((acc, value) => {
//     return acc + value.duration;
//   });
// }

export function remainingDuration(playlist) {
  return playlist.reduce((acc, value) => {
    return acc + value.remainingDuration;
  }, 0);
}
