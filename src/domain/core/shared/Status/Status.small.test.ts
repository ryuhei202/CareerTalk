import { expect, test, describe} from 'vitest';
import { InvalidStatusError, Status, StatusEnum } from './Status';
describe("Status", () => {

  test("有効なステータスでインスタンスが生成する", () => {  
    const pendingStatus = new Status(StatusEnum.PENDING);
    const approvedStatus = new Status(StatusEnum.APPROVED);
    const rejectedStatus = new Status(StatusEnum.REJECTED);

    expect(pendingStatus.value).toBe(StatusEnum.PENDING);
    expect(approvedStatus.value).toBe(StatusEnum.APPROVED);
    expect(rejectedStatus.value).toBe(StatusEnum.REJECTED);
  });

  test("無効なステータスでInvalidStatusErrorが投げられること", () => {
    const invalidStatusValue = "INVALID" as StatusEnum;

    expect(() => new Status(invalidStatusValue)).toThrow(InvalidStatusError);
  });

  describe("toLabel()", () => {
    test("ステータスがラベルに変換されること", () => {
      const pendingStatus = new Status(StatusEnum.PENDING);
      const approvedStatus = new Status(StatusEnum.APPROVED);
      const rejectedStatus = new Status(StatusEnum.REJECTED);

      expect(pendingStatus.toLabel()).toBe("審査中");
      expect(approvedStatus.toLabel()).toBe("承認済み");
      expect(rejectedStatus.toLabel()).toBe("拒否");
    });
  });
});
