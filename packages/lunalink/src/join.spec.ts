import { describe, expect, it } from "vitest";
import { join } from "./index.js";

describe("The join function", () => {
  it("should join correctly simple paths", () => {
    const path1 = "/contacts/8D396084-1935-4E16-8BE0-911EF71C8";
    const path2 = "https://api.example.org";

    expect(join(path1, path2, "/")).toBe(
      "https://api.example.org/contacts/8D396084-1935-4E16-8BE0-911EF71C8"
    );
  });

  it("should join correclty paths with leading and trailing slashes", () => {
    const path1 = "/contacts/8D396084-1935-4E16-8BE0-911EF71C8";
    const path2 = "https://api.example.org/";

    expect(join(path1, path2, "/")).toBe(
      "https://api.example.org/contacts/8D396084-1935-4E16-8BE0-911EF71C8"
    );
  });

  it("should work the same if paths are inverted", () => {
    const notReallyPath1 = "/contacts/8D396084-1935-4E16-8BE0-911EF71C8";
    const path2 = "https://api.example.org/";

    expect(join(path2, notReallyPath1, "/")).toBe(
      "https://api.example.org/contacts/8D396084-1935-4E16-8BE0-911EF71C8"
    );
  });
});
