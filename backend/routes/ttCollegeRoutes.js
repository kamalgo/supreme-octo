const express = require("express");
const router = express.Router();  // Initialize router
 
const{getTtcollegeTranches} = require("../controllers/ttcollegeController");

router.get("/ttcollege/tranches", getTtcollegeTranches);



module.exports = router;
