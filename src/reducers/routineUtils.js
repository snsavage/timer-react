export function createPlaylist(routine) {
  let playlist = [];

  for(let j = 0; j < routine.groups.length; j++) {
    let group = routine.groups[j];

    for(let times = 0; times < group.times; times++) {
      for(let i = 0; i < group.intervals.length; i++) {
        const interval = group.intervals[i];

        playlist.push({
          groupID: group.id,
          groupNumber: times + 1,
          name: interval.name,
          duration: interval.duration,
          remainingDuration: interval.duration,
        });
      }
    }
  }

  return playlist;
}

export function advancePlaylist(state) {
  const { playlist, completedPlaylist } = state;
  const track = playlist[0];

  if(playlist.length === 0) { return state; }

  if(playlist[0].remainingDuration === 1) {
    track.remainingDuration = track.duration;

    return {
      playlist: playlist.slice(1, playlist.length),
      completedPlaylist: [track, ...completedPlaylist],
    }
  } else {
    track.remainingDuration = track.remainingDuration - 1;

    return {
      playlist: [track, ...playlist.slice(1, playlist.length)],
      completedPlaylist: completedPlaylist,
    }
  }
}

export function rewindPlaylist(state) {
  const { playlist, completedPlaylist } = state;

  if(completedPlaylist.length === 0 &&
    playlist[0].remainingDuration === playlist[0].duration) {
    return {...state};
  } else if (playlist.length === 0) {
    return {
      playlist: [completedPlaylist[0]],
      completedPlaylist: [...completedPlaylist.slice(1, completedPlaylist.length)],
    };
  } else if (playlist[0].remainingDuration !==  playlist[0].duration) {
    const track = playlist[0];
    track.remainingDuration = track.duration;

    return {
      playlist: [track, ...playlist.slice(1, playlist.length)],
      completedPlaylist: completedPlaylist,
    };
  } else if (playlist[0].remainingDuration === playlist[0].duration) {
    const track = completedPlaylist[0];

    return {
      playlist: [track, ...playlist],
      completedPlaylist: completedPlaylist.slice(1, completedPlaylist.length),
    };
  }
}

