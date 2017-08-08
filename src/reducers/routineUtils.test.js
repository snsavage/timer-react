import {
  createPlaylist,
  advancePlaylist,
  rewindPlaylist,
} from './routineUtils';

describe("createPlaylist()", () => {
  it("creates a playlist from a routine with one group and interval", () => {
    const routine = {
      groups: [
        {
          id: 0,
          times: 1,
          intervals: [{ name: "Interval 1", duration: 10 }]
        }
      ]
    }

    expect(createPlaylist(routine)).toEqual(
      [
        {
          groupID: 0,
          groupNumber: 1,
          name: "Interval 1",
          duration: 10,
          remainingDuration: 10,
        }
      ]
    );
  });

  it("creates a playlist from a routine with a repeated group", () => {
    const routine = {
      groups: [
        {
          id: 0,
          times: 2,
          intervals: [{ name: "Interval 1", duration: 10 }]
        }
      ]
    }

    expect(createPlaylist(routine)).toEqual(
      [
        {
          groupID: 0,
          groupNumber: 1,
          name: "Interval 1",
          duration: 10,
          remainingDuration: 10,
        },
        {
          groupID: 0,
          groupNumber: 2,
          name: "Interval 1",
          duration: 10,
          remainingDuration: 10,
        }
      ]
    );
  });

  it("creates a playlist from a routine with multiple intervals", () => {
    const routine = {
      groups: [
        {
          id: 0,
          times: 1,
          intervals: [
            { name: "Interval 1", duration: 10 },
            { name: "Interval 2", duration: 10 },
          ]
        }
      ]
    }

    expect(createPlaylist(routine)).toEqual(
      [
        {
          groupID: 0,
          groupNumber: 1,
          name: "Interval 1",
          duration: 10,
          remainingDuration: 10,
        },
        {
          groupID: 0,
          groupNumber: 1,
          name: "Interval 2",
          duration: 10,
          remainingDuration: 10,
        }
      ]
    );
  });

  it("creates a playlist from a routine with multiple groups", () => {
    const routine = {
      groups: [
        {
          id: 0,
          times: 1,
          intervals: [
            { name: "Interval 1", duration: 10 },
          ]
        },
        {
          id: 1,
          times: 1,
          intervals: [
            { name: "Interval 1", duration: 10 },
          ]
        }
      ]
    }

    expect(createPlaylist(routine)).toEqual(
      [
        {
          groupID: 0,
          groupNumber: 1,
          name: "Interval 1",
          duration: 10,
          remainingDuration: 10,
        },
        {
          groupID: 1,
          groupNumber: 1,
          name: "Interval 1",
          duration: 10,
          remainingDuration: 10,
        }
      ]
    );
  });
});

describe("advancePlaylist()", () => {
  let state;

  beforeEach(() => {
    state = {
      completedPlaylist: [],
      playlist: [
        {
          "groupID": 1,
          "groupNumber": 1,
          "name": "Warm Up",
          "duration": 600,
          "remainingDuration": 600
        },
        {
          "groupID": 2,
          "groupNumber": 1,
          "name": "Sprint",
          "duration": 20,
          "remainingDuration": 20
        },
        {
          "groupID": 2,
          "groupNumber": 1,
          "name": "Rest",
          "duration": 10,
          "remainingDuration": 10
        }
      ]
    }
  });

  it("does not mutate the playlist object", () => {
    expect(advancePlaylist(state)).not.toBe(state);
  });

  describe("a single tick of the timer", () => {
    let advancedPlaylist;

    beforeEach(() => {
      advancedPlaylist = advancePlaylist(state)
    });

    it("decrements remainingDuration for the first track", () => {
      expect(advancedPlaylist.playlist[0].remainingDuration).toEqual(599);
    });

    it("does not remove the current track from the playlist", () => {
      expect(advancedPlaylist.completedPlaylist).toEqual([]);
    });
  });

  describe("completing a track", () => {
    let advancedPlaylist;

    beforeEach(() => {
      state.playlist[0].remainingDuration = 1;

      advancedPlaylist = advancePlaylist(state)
    });

    it("decrements remainingDuration for the first track", () => {
      expect(
        advancedPlaylist.completedPlaylist[0].remainingDuration
      ).toEqual(0);
    });

    it("does not decrement the next track", () => {
      expect(
        advancedPlaylist.playlist[0].remainingDuration
      ).toBe(advancedPlaylist.playlist[0].duration);
    });
  });

  describe("completing a routine", () => {
    let advancedPlaylist;

    beforeEach(() => {
      state.completedPlaylist = [...state.playlist];
      state.playlist = [];

      advancedPlaylist = advancePlaylist(state);
    });

    it("does nothing if a routine is complete", () => {
      expect(advancedPlaylist).toEqual(state);
    });
  });
});

describe("rewindPlaylist()", () => {
  let state;

  beforeEach(() => {
    state = {
      completedPlaylist: [
        {
          "groupID": 1,
          "groupNumber": 1,
          "name": "Warm Up",
          "duration": 600,
          "remainingDuration": 0
        }
      ],
      playlist: [
        {
          "groupID": 2,
          "groupNumber": 1,
          "name": "Sprint",
          "duration": 20,
          "remainingDuration": 20
        },
        {
          "groupID": 2,
          "groupNumber": 1,
          "name": "Rest",
          "duration": 10,
          "remainingDuration": 10
        }
      ]
    }
  });

  it("does not mutate the playlist object", () => {
    expect(rewindPlaylist(state)).not.toBe(state);
  });

  it("restores remaining duration when completedPlaylist is empty", () => {
    state.playlist[0].remainingDuration = 0;

    expect(
      rewindPlaylist(state).playlist[0].remainingDuration
    ).toBe(state.playlist[0].duration);
  });

  it("restores remaining duration and adds track to playlist", () => {
    expect(
      rewindPlaylist(state).playlist.length
    ).toBe(3);
  });

  it("does nothing if the playlist back to beginning", () => {
    const newState = {
      playlist: [...state.playlist, ...state.completedPlaylist],
      completedPlaylist: []
    };

    expect(rewindPlaylist(newState)).toEqual(newState);
  });
});

