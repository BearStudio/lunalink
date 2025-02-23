import { describe, expect, test } from "vitest";
import { lunaurl } from "./lunaurl.js";

describe("lunaurl", () => {
  test("simple replace", () => {
    expect(
      lunaurl("/contacts/:id", { id: "851C1EC5-47F1-4CB6-A849-19CB007D786C" })
    ).toBe("/contacts/851C1EC5-47F1-4CB6-A849-19CB007D786C");
  });

  test("multiple replace", () => {
    expect(
      lunaurl("/contacts/:contactId/emails/:emailId", {
        contactId: "22DF14FF-387F-4E48-92F0-DC60738E13F0",
        emailId: "EE055AF1-0D08-406B-9B93-E3869CA6227E",
      })
    ).toBe(
      "/contacts/22DF14FF-387F-4E48-92F0-DC60738E13F0/emails/EE055AF1-0D08-406B-9B93-E3869CA6227E"
    );
  });
});
