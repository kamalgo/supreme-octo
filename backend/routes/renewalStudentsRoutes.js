const express = require("express");
const router = express.Router();

const{getAllRenewalStudentsForPageLoad, searchRenewalStudents , getallRenewalStudents, getRenewalStudentDetails, getSingleMahadbtRenewalProfile, updateMahadbtRenewalProfile
     , sendincomeDocS3Renewal, sendfeeReceiptS3Renewal, sendHostelCertToS3Renewal, sendalpabudharakCertS3Renewal,
     sendDeclarationCertToS3Renewal, sendRegisteredLabourCertToS3Renewal, sendStudentPanCardToS3Renewal,
     sendFatherPanCardToS3Renewal, sendFatherAadharCardToS3Renewal, sendCasteValidityToS3Renewal, sendAllotmentLetterToS3Renewal,
     sendLeavingCertToS3Renewal, sendRationCardToS3Renewal, sendPreviousYearMarksheetToS3Renewal,
     sendGapCertToS3Renewal
     } = require("../controllers/renewalStudentsController");

router.post("/getallRenewalStudents",getAllRenewalStudentsForPageLoad);
router.post('/searchRenewalStudents', searchRenewalStudents);

router.get("/getRenewalStudentDetails/:id", getRenewalStudentDetails);
router.post("/getSingleMahadbtRenewalProfile", getSingleMahadbtRenewalProfile);
router.put("/updateMahadbtRenewalProfile", updateMahadbtRenewalProfile);
router.put("/sendincomeDocS3Renewal", sendincomeDocS3Renewal);
router.put("/sendfeeReceiptS3Renewal", sendfeeReceiptS3Renewal);
router.put("/sendHostelCertToS3Renewal", sendHostelCertToS3Renewal);
router.put("/sendalpabudharakCertS3Renewal", sendalpabudharakCertS3Renewal);
router.put("/sendDeclarationCertToS3Renewal", sendDeclarationCertToS3Renewal);
router.put("/sendRegisteredLabourCertToS3Renewal", sendRegisteredLabourCertToS3Renewal);
router.put("/sendStudentPanCardToS3Renewal", sendStudentPanCardToS3Renewal);
router.put("/sendFatherPanCardToS3Renewal", sendFatherPanCardToS3Renewal);
router.put("/sendFatherAadharCardToS3Renewal", sendFatherAadharCardToS3Renewal);
router.put("/sendCasteValidityToS3Renewal", sendCasteValidityToS3Renewal);
router.put("/sendAllotmentLetterToS3Renewal", sendAllotmentLetterToS3Renewal);
router.put("/sendLeavingCertToS3Renewal", sendLeavingCertToS3Renewal);
router.put("/sendRationCardToS3Renewal", sendRationCardToS3Renewal);
router.put("/sendPreviousYearMarksheetToS3Renewal", sendPreviousYearMarksheetToS3Renewal);
router.put("/sendGapCertToS3Renewal", sendGapCertToS3Renewal);


module.exports = router;
