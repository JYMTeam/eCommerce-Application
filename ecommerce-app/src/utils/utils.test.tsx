import { subtractYears } from "./utils";

describe("subtractYears function", () => {
  it("subtracts years from date", () => {
    const subtractedYear = subtractYears(new Date("2023-02-06T00:00:00"), 23);
    expect(subtractedYear).toEqual(new Date("2000-02-06T00:00:00"));
  });
});
