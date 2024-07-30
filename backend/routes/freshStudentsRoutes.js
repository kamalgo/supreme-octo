const express = require("express");
const router = express.Router();

const { getallFreshStudents } = require("../controllers/freshStudentsController");

router.get("/getallFreshStudents", getallFreshStudents);

module.exports = router;


// const express = require("express");
// const router = express.Router();

// const{getallFreshStudents} = require ("../controllers/freshStudentsController");

// router.get("/getallFreshStudents", getallFreshStudents);

// module.exports = router;
