const express = require("express");
const router = express.Router();  // Initialize router
 
const{getForstuTranches, getStudentByApplicationId, addTranchData, getAllForstuTranches} = require("../controllers/forstuTranchesController");

router.get("/getstudentstranch", getForstuTranches);
router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);
router.post("/addtranch",addTranchData);


module.exports = router;
