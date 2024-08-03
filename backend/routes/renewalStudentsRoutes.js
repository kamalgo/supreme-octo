const express = require("express");
const router = express.Router();

const{getallRenewalStudents, sendCasteDocumentToS3Renewal, getRenewalStudentDetails,
     getSingleMahadbtRenewalProfile, updateMahadbtRenewalProfile} = require("../controllers/renewalStudentsController");

router.get("/getallRenewalStudents",getallRenewalStudents);
router.put("/sendCasteDocumentToS3Renewal", sendCasteDocumentToS3Renewal);
router.get("/getRenewalStudentDetails/:id", getRenewalStudentDetails);
router.post("/getSingleMahadbtRenewalProfile", getSingleMahadbtRenewalProfile);
router.put("/updateMahadbtRenewalProfile", updateMahadbtRenewalProfile);

module.exports = router;
