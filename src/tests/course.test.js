//incluimos por la relacion
require("../models");

const request = require("supertest");
const app = require("../app");
const Student = require("../models/Student");

let courseId;
let student;

const BASE_URL = "/api/v1/courses";

const course = {
  name: "POO",
  credits: 3,
};

afterAll(async () => {
  await student.destroy();
});

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === course.name", async () => {
  const res = await request(app).post(BASE_URL).send(course);

  courseId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(course.name);
});

test("GET -> 'BASE_URL', should return status code 200, res.body[0].name === course.name", async () => {
  const res = await request(app).get(BASE_URL);

  // console.log(res.body)

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].name).toBe(course.name);
  expect(res.body).toHaveLength(1);

  expect(res.body[0].students).toBeDefined();
  expect(res.body[0].students).toHaveLength(0);
});

test("GET -> 'BASE_URL/courseId', should return statusCode 200, and res.body.name === course.name", async () => {
  const res = await request(app).get(`${BASE_URL}/${courseId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(course.name);

  expect(res.body.students).toBeDefined();
  expect(res.body.students).toHaveLength(0);
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.name === courseUpdate.name", async () => {
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

test("POST -> 'BASE_URL/:id/students', should return statusCode 200, and res.body.length = 1", async () => {
  student = await Student.create({
    firstName: "Tona",
    lastName: "Sanchez",
    birthday: "2010-01-10",
    program: "Ing. software",
  });

  const res = await request(app)
    .post(`${BASE_URL}/${courseId}/students`) //! courses/:id/students
    .send([student.id]);

  // console.log(res.body);s

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].studentCourse.studentId).toBeDefined();
  expect(res.body[0].studentCourse.studentId).toBe(student.id);

  expect(res.body[0].studentCourse.courseId).toBeDefined();
  expect(res.body[0].studentCourse.courseId).toBe(courseId);
});

test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${courseId}`);

  expect(res.statusCode).toBe(204);
});
