import { remainingDuration } from './timer';

const playlist = [
  { duration: 10, remainingDuration: 5, },
  { duration: 20, remainingDuration: 10, },
  { duration: 30, remainingDuration: 15, }
];

describe("remainingDuration()", () => {
  it("calculates duration on a single playlist track", () => {
    expect(remainingDuration(playlist.slice(0,1))).toBe(5);
  });

  it("calculates the remaining duration of a multi track playlist", () => {
    expect(remainingDuration(playlist)).toBe(30);
  });
});
