const express = require("express");
const router = express.Router();

const { getallFreshStudents, sendCasteDocumentToS3Fresh, getFreshStudentDetails } = require("../controllers/freshStudentsController");

router.get("/getallFreshStudents", getallFreshStudents);
router.get("/getFreshStudentDetails/:id", getFreshStudentDetails);

router.put("/sendCasteDocumentToS3Fresh", sendCasteDocumentToS3Fresh);


module.exports = router;


// const express = require("express");
// const router = express.Router();

// const{getallFreshStudents} = require ("../controllers/freshStudentsController");

// router.get("/getallFreshStudents", getallFreshStudents);

// module.exports = router;
