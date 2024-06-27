const express = require("express");
const router = express.Router();  // Initialize router
 
const{getAllCandidates} = require("../controllers/forstuCandidateController");

router.get("/getallcandidates", getAllCandidates)
// router.get("/getstudentstranch", getForstuTranches);
// router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);
// router.post("/addtranch",addTranchData);


module.exports = router;
