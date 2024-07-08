const express = require("express");
const router = express.Router();  // Initialize router
 
const{getForstuTranches, getStudentByApplicationId, addTranchData, getAllForstuTranches, 
        addCandidateData, getCandidateCountByApplicationId,
         getForstuTranchesCount, getForstuTranch1Count} = require("../controllers/forstuTranchesController");

router.get("/alltranches", getAllForstuTranches)
// router.get("/getstudentstranch", getForstuTranches);
// router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);
router.post("/addtranch",addTranchData);
router.post("/addCandidate",addCandidateData);
router.get('/candidate-count/:ApplicationID', getCandidateCountByApplicationId);
router.get("/getForstuTranchesCount", getForstuTranchesCount);
router.get("/getForstuTranch1Count", getForstuTranch1Count)

module.exports = router;
