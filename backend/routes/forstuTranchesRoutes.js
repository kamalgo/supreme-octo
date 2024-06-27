const express = require("express");
const router = express.Router();  // Initialize router
 
const{getForstuTranches, getStudentByApplicationId, addTranchData, getAllForstuTranches, addCandidateData, getCandidateCountByApplicationId} = require("../controllers/forstuTranchesController");

router.get("/alltranches", getAllForstuTranches)
// router.get("/getstudentstranch", getForstuTranches);
// router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);
router.post("/addtranch",addTranchData);
router.post("/addCandidate",addCandidateData);
router.get('/candidate-count/:ApplicationID', getCandidateCountByApplicationId);



module.exports = router;
