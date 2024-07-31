const express = require("express");
const router = express.Router();

const{getallRenewalStudents, sendCasteDocumentToS3Renewal, getRenewalStudentDetails} = require("../controllers/renewalStudentsController");

router.get("/getallRenewalStudents",getallRenewalStudents);
router.put("/sendCasteDocumentToS3Renewal", sendCasteDocumentToS3Renewal);
router.get("/getRenewalStudentDetails/:id", getRenewalStudentDetails);


module.exports = router;
