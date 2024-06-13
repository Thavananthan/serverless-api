"use strict";
const _ = require("lodash");
var Promise = this.Promise || require("promise");
var agent = require("superagent-promise")(require("superagent"), Promise);

const makeHttpRequest = async (path, method, options) => {
  let root = process.env.TEST_ROOT;
  let url = `${root}/${path}`;
  let httpReq = agent(method, url);
  let body = _.get(options, "body");
  let idToken = _.get(options, "idToken");
  console.log(`invoking HTTP ${method} ${url}`);

  try {
    httpReq.set("Authorization", idToken);
    if (body) {
      httpReq.send(body);
    }

    let response = await httpReq;
    return {
      statusCode: response.status,
      body: response.body,
    };
  } catch (err) {
    return {
      statusCode: err.status,
      body: null,
    };
  }
};

exports.we_invoke_createNote = (options) => {
  let response = makeHttpRequest("notes", "POST", options);
  return response;
};
