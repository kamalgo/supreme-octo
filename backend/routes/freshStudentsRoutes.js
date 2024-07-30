const express = require("express");
const router = express.Router();

const { getallFreshStudents, sendCasteDocumentToS3Fresh, getFreshStudentDetails } = require("../controllers/freshStudentsController");

router.get("/getallFreshStudents", getallFreshStudents);
router.put("/sendCasteDocumentToS3Fresh", sendCasteDocumentToS3Fresh);
router.get("/getFreshStudentDetails/:id", getFreshStudentDetails);


module.exports = router;


// const express = require("express");
// const router = express.Router();

// const{getallFreshStudents} = require ("../controllers/freshStudentsController");

// router.get("/getallFreshStudents", getallFreshStudents);

// module.exports = router;
