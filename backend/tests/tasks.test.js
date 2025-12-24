const request = require("supertest");
const { server, app } = require("../index");
const mongoose = require("mongoose");

describe("GET /api/tasks", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });

  it("should return an array of tasks", async () => {
    const res = await request(app).get("/api/tasks");

    // res.body is now an array
    expect(Array.isArray(res.body)).toBe(true);

    console.log(res.body, "DATA SEEDED");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
