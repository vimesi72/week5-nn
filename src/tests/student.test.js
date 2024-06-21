const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/students";

let studentId;

const student = {
  firstName: "Brandon",
  lastName: "Hernandez",
  birthday: "1993-07-07",
  program: "Ing. software",
};

test("POST -> 'BASE_URL', should return status code 201, and res.body.firstName === student.firstName", async () => {
  const res = await request(app).post(BASE_URL).send(student);

  studentId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(student.firstName);
});

test("GET -> 'BASE_URL', should status code 200, res.body[0].firstName === student.firstName and res.body.length =1", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].firstName).toBe(student.firstName);
  expect(res.body).toHaveLength(1);
});

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.firstName =  student.firstName", async () => {
  const res = await request(app).get(`${BASE_URL}/${studentId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(student.firstName);
});

test("PUT -> 'BASE_URL/:id', should return status code 200, adn res.body.firstName === 'Uriel", async () => {
  const studentUpdate = {
    firstName: "Juan",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${studentId}`)
    .send(studentUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(studentUpdate.firstName);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${studentId}`);

  expect(res.statusCode).toBe(204);
});
