const request = require("supertest");

const server = require("./server");

const { getUsers } = require("./bpdts");

jest.mock("./bpdts");

test("server implements strict routing", () => {
  jest.resetModules();
  const express = require("express");
  const spy = jest.spyOn(express, "Router");
  require("./server");
  expect(spy).toHaveBeenCalledWith({ strict: true });
});

test("server returns a 200 response", () => {
  return request(server)
    .get("/")
    .expect(200, "Ok");
});

test("the /users endpoint returns an array of users", () => {
  getUsers.mockImplementation(() => Promise.resolve([{ foo: "bar" }]));

  return request(server)
    .get("/users")
    .then(res => {
      expect(getUsers).toHaveBeenCalledWith();
      expect(res.body).toEqual([{ foo: "bar" }]);
    });
});

test("the api handles errors from the upstream service", () => {
  getUsers.mockImplementation(() => Promise.reject());
  return request(server)
    .get("/users")
    .expect(500, {
      error: "unable to get users from upstream service",
    });
});

test.todo("the upstream service times out");
