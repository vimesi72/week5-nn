const request = require("supertest");
const app = require("../app");

let courseId;

const BASE_URL = "/api/v1/courses";

const course = {
  name: "POO",
  credits: 3,
};

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === course.name", async () => {
  const res = await request(app).post(BASE_URL).send(course);

  courseId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(course.name);
});

test("GET -> 'BASE_URL', should return status code 200, res.body[0].name === course.name", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].name).toBe(course.name);
  expect(res.body).toHaveLength(1);
});

test("GET -> 'BASE_URL/courseId', should return status code 200, and res.body.name === course.name ", async () => {
  const res = await request(app).get(`${BASE_URL}/${courseId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(course.name);
});

test("PUT-> 'BASE_URL/:id', should return status code 200, and res.body.name === courseUpdate.name", async () => {
  const courseUpdate = {
    name: "Algebra",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${courseId}`)
    .send(courseUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(courseUpdate.name);
});

test("DELETE-> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${courseId}`);

  expect(res.statusCode).toBe(204);
});
