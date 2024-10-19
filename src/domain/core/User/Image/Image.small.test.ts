import { describe, expect, test } from "vitest";
import { Image, InvalidImageError } from "./Image";

describe("Image", () => {
  test("正しい画像URLでImageを生成する", () => {
    const httpsImage = new Image("https://example.com/image.jpg");
    const httpImage = new Image("http://example.com/image.jpg");
    
    expect(httpsImage.value).toBe("https://example.com/image.jpg");
    expect(httpImage.value).toBe("http://example.com/image.jpg");
  });

  test("画像が設定されていないとき、valueはundefinedである", () => {
    const image = new Image(undefined);
    expect(image.value).toBeUndefined();
  });

  test("最小長以下でImageを生成するとInvalidImageErrorを投げる", () => {
    expect(() => new Image("")).toThrow(InvalidImageError)
  });

  test("無効な画像URLでImageを生成するとエラーを投げる", () => {
    expect(() => new Image("aaa://example.com/image.jpg")).toThrow(InvalidImageError);
  });
});
