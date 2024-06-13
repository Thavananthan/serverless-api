"use strict";
let init = require("./steps/init");
let { an_authenticated_user } = require("./steps/given");
let { we_invoke_createNote } = require("./steps/when");
let idToken;

describe("Given an authenticated user", () => {
  beforeAll(async () => {
    init();
    let user = await an_authenticated_user();
    idToken = user.AuthenticationResult.IdToken;
  });
  describe("When I invoke the POST /notes endpoint", () => {
    test("Should create new  note", async () => {
      const body = {
        title: "Hello, world!",
        body: "test.png",
        id: "1000",
      };

      let result = await we_invoke_createNote({ idToken, body });
      expect(result.statusCode).toEqual(201);
    });
  });
});
