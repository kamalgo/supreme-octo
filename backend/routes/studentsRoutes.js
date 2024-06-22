//this uses candidate info model
//controller used studentController

const express = require("express");

const {addStudent, getAllTheStudents} = require('../controllers/studentsController');

const router = express.Router();  // Initialize router

//this is the router to add students from Students section on LHS
router.post("/addS", addStudent);

//this is used to get all the students
router.get("/getallthestudents", getAllTheStudents);

module.exports = router;

 