import { describe, expect, test } from "vitest";
import { InvalidMeetingMethodError, MeetingMethod, MeetingMethodEnum } from "./MeetingMethod";

describe("MeetingMethod", () => {
  test("有効な訪問方法を生成する", () => {
    const online = new MeetingMethod(MeetingMethodEnum.ONLINE);
    const offline = new MeetingMethod(MeetingMethodEnum.OFFLINE);
    const both = new MeetingMethod(MeetingMethodEnum.BOTH);

    expect(online.value).toBe(MeetingMethodEnum.ONLINE);
    expect(offline.value).toBe(MeetingMethodEnum.OFFLINE);
    expect(both.value).toBe(MeetingMethodEnum.BOTH);
  });

  test("訪問方法が未設定の場合はundefinedが返される", () => {
    const meetingMethod = new MeetingMethod(undefined);
    expect(meetingMethod.value).toBeUndefined();
  });

  test("無効な訪問方法を生成するとInvalidMeetingMethodErrorがスローされる", () => {
    expect(() => new MeetingMethod("INVALID" as MeetingMethodEnum)).toThrow(InvalidMeetingMethodError);
  });

  test("toLabel()", () => {
    const online = new MeetingMethod(MeetingMethodEnum.ONLINE);
    const offline = new MeetingMethod(MeetingMethodEnum.OFFLINE);
    const both = new MeetingMethod(MeetingMethodEnum.BOTH);
    const undefinedMeetingMethod = new MeetingMethod(undefined);

    expect(online.toLabel()).toBe("オンライン");
    expect(offline.toLabel()).toBe("オフライン");
    expect(both.toLabel()).toBe("オンライン/オフライン");
    expect(undefinedMeetingMethod.toLabel()).toBeUndefined();
  });
});
