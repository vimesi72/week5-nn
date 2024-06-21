const catchError = require("../utils/catchError");
const Course = require("../models/Course");
const Student = require("../models/Student");

const getAll = catchError(async (req, res) => {
  const results = await Course.findAll({ include: [Student] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Course.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.findByPk(id, { include: [Student] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setStudents = catchError(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findByPk(id);
  // const course = await Course.findOne({ where: { id,isVerifed:true } })

  if (course) {
    //!courses le tengo que setear estudiantes
    await course.setStudents(req.body);
    //!obtener los estudiantes seteados
    const students = await course.getStudents();
    return res.json(students);
  }

  return res.status(404).json({ error: "Course not found" });
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setStudents,
};
