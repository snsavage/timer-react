import { displayTime, pad } from "./displayTime";

describe("displayTime()", () => {
  it("converts seconds", () => {
    expect(displayTime(30)).toBe("00:30 seconds");
  });

  it ("convets single digit seconds", () => {
    expect(displayTime(1)).toBe("00:01 second");
  });

  it("converts minutes", () => {
    expect(displayTime(120)).toBe("02:00 minutes");
  });

  it("converts single digit minutes", () => {
    expect(displayTime(60)).toBe("01:00 minute");
  });

  it("converts single digit hours", () => {
    expect(displayTime(3600)).toBe("01:00:00 hour");
  });

  it("converts hours", () => {
    expect(displayTime(7200)).toBe("02:00:00 hours");
  });
});
