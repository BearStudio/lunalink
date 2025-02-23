import { describe, expect, it } from "vitest";
import { lunaurl } from "./lunaurl.js";

describe("lunaurl", () => {
  it("should replace a single param", () => {
    const actual = lunaurl("/contacts/:id", {
      id: "851C1EC5-47F1-4CB6-A849-19CB007D786C",
    });
    const expected = "/contacts/851C1EC5-47F1-4CB6-A849-19CB007D786C";

    expect(actual).toBe(expected);
  });

  it("should replace multiple params", () => {
    const actual = lunaurl("/contacts/:contactId/emails/:emailId", {
      contactId: "22DF14FF-387F-4E48-92F0-DC60738E13F0",
      emailId: "EE055AF1-0D08-406B-9B93-E3869CA6227E",
    });
    const expected =
      "/contacts/22DF14FF-387F-4E48-92F0-DC60738E13F0/emails/EE055AF1-0D08-406B-9B93-E3869CA6227E";

    expect(actual).toBe(expected);
  });

  it("should throw an error on missing parameter", () => {
    const actual = () =>
      lunaurl(
        "/contacts/:contactId/emails/:emailId",
        // @ts-expect-error we miss one parameter to make sure we handle runtime throw
        {
          contactId: "22DF14FF-387F-4E48-92F0-DC60738E13F0",
        }
      );
    const expected = "Missing parameter emailId";

    expect(actual).toThrowError(expected);
  });

  it("should work with simple replace and with one more param", () => {
    const actual = lunaurl("/contacts/:id", {
      id: "9D8F189B-6453-477C-BEAE-8BAE00B5DD52",
      search: "search",
    });
    const expected =
      "/contacts/9D8F189B-6453-477C-BEAE-8BAE00B5DD52?search=search";

    expect(actual).toBe(expected);
  });

  it("should replace multiple params and multiple query params", () => {
    const actual = lunaurl("/contacts/:id/emails/:emailId", {
      id: "9D8F189B-6453-477C-BEAE-8BAE00B5DD52",
      emailId: "5998CFB1-9482-4A44-BE59-8B2DFC91A224",
      search: "Black cat named Luna",
      limit: 4,
      enabled: true,
    });
    const expected =
      "/contacts/9D8F189B-6453-477C-BEAE-8BAE00B5DD52/emails/5998CFB1-9482-4A44-BE59-8B2DFC91A224?enabled=true&limit=4&search=Black%20cat%20named%20Luna";

    expect(actual).toBe(expected);
  });

  it("shoud remove ? if it is already in the path", () => {
    const actual = lunaurl("/contacts/:id?", {
      id: "9D8F189B-6453-477C-BEAE-8BAE00B5DD52",
      search: "search",
    });
    const expected =
      "/contacts/9D8F189B-6453-477C-BEAE-8BAE00B5DD52?search=search";

    expect(actual).toBe(expected);
  });
});
