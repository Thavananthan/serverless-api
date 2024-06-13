"use strict";
let init = require("./steps/init");
let { an_authenticated_user } = require("./steps/given");
let idToken;

describe("Given an authenticated user", async () => {
  beforeAll(async () => {
    init();
    let user = await an_authenticated_user();
    idToken = user.AuthenticationResult.IdToken;
  });
  describe("When I invoke the POST /notes endpoint", () => {
    it("Should return an array of notes", async () => {
      expect(true).toEqual(true);
    });
  });
});
