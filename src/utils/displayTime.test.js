import { convertTime, displayTime, pad } from "./displayTime";

describe("convertTime()", () => {
  it("returns 0 for bad input", () => {
    expect(convertTime("NaN")).toBe(0);
  });

  it("returns 0 for bad input", () => {
    expect(convertTime("NaN:00")).toBe(0);
  });

  it("converts a single digit", () => {
    expect(convertTime("1")).toBe(1);
  });

  it("converts a double digits", () => {
    expect(convertTime("10")).toBe(10);
  });

  it("converts a minute", () => {
    expect(convertTime("1:00")).toBe(60);
  });

  it("converts single digit minutes", () => {
    expect(convertTime("1:10")).toBe(70);
  });

  it("converts double digit minutes", () => {
    expect(convertTime("10:10")).toBe(610);
  });

  it("converts a hour", () => {
    expect(convertTime("1:00:00")).toBe(3600);
  });

  it("converts a single digit hour", () => {
    expect(convertTime("1:10:10")).toBe(4210);
  });

  it("converts a double digit hour", () => {
    expect(convertTime("10:10:10")).toBe(36610);
  });
});

describe("displayTime()", () => {
  it("returns 00:00:00 for bad input", () => {
    expect(displayTime("NaN")).toBe("00:00:00");
  });

  it ("convets single digit seconds", () => {
    expect(displayTime(1)).toBe("00:01 sec");
  });

  it("converts seconds", () => {
    expect(displayTime(30)).toBe("00:30 sec");
  });

  it("converts single digit minutes", () => {
    expect(displayTime(60)).toBe("01:00 min");
  });

  it("converts minutes", () => {
    expect(displayTime(120)).toBe("02:00 min");
  });

  it("converts single digit hours", () => {
    expect(displayTime(3600)).toBe("01:00:00 hr");
  });

  it("converts hours", () => {
    expect(displayTime(7200)).toBe("02:00:00 hr");
  });
});
