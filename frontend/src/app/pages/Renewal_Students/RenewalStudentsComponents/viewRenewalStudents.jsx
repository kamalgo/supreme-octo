import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Import ExternalLinkIcon from Chakra UI
import { Box, Heading, SimpleGrid, Text, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import Base from "../../../components/Base";
import { renewalStudentProfileView, updatePersonalInfo, updateIncomeDetails  } from "../../../api/RenewalStudentsApi/RenewalStudentsApi";
import Edit_Prsnl_Renewal_Modal from "./Edit_Prsnl_Renewal_Modal";
import Edit_Income_Renewal_Modal from "./Edit_Income_Renewal_Modal";
import Edit_Current_Course_Renewal_Modal from "./Edit_Current_Course_Renewal_Modal";
import Edit_Hostel_Renewal_Modal from "./Edit_Hostel_Renewal_Modal";
import Edit_Scheme_Renewal_Modal from "./Edit_Scheme_Renewal_Modal";
import PersonalInfoVerificationDialog from "./verificationDialogs/PersonalInfoVerificationDialog";
import IncomeDetailsVerificationDialog from "./verificationDialogs/IncomeDetailsVerificationDialog";
import CurrentCourseDialog  from "./verificationDialogs/CurrentCourseDialog"
 


function viewRenewalStudents() {
  const [isVerified, setIsVerified] = useState(false);
  const [isIncomeVerified, setIsIncomeVerified] = useState(false);
  const [isCurrentCourseVerified, setIsCurrentCourseVerified] = useState(false);

  const [viewData, setViewData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);



//Dialogs
  const [isPersonalDialogOpen, setIsPersonalDialogOpen] = useState(false); // State for personal info dialog
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false); // State for income dialog
  const [isCurrentCourseDialogOpen, setIsCurrentCourseDialogOpen] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = { id };
        const response = await renewalStudentProfileView(data);
        setViewData(response.data);
        setIsVerified(response.data.personalInfo_verified === 'yes');
        setIsIncomeVerified(response.data.incomeInfo_verified === 'yes');
        setIsCurrentCourseVerified(response.data.currentCourse_verified === 'yes');

      } catch (err) {
        console.error("Error fetching student profile view data:", err);
      }
    };
    fetchProfileData();
  }, [id]);

  const handleVerifyClick = (e, section) => {
    e.stopPropagation();
    if (section === 'personal') {
      setIsPersonalDialogOpen(true);
    } else if (section === 'income') {
      setIsIncomeDialogOpen(true);
    }
    
  };

  const confirmPersonalVerification = async (verificationStatus) => {
    try {
      const response = await updatePersonalInfo(id, verificationStatus);
      if (response.success) {
        setIsVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating personal information verification status:", err);
    } finally {
      setIsPersonalDialogOpen(false);
    }
  };

  const confirmCurrentCourseVerification = async (verificationStatus) => {
    try {
      const response = await updateIncomeDetails(id, verificationStatus);
      if (response.success) {
        setIsIncomeVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating income verification status:", err);
    } finally {
      setIsIncomeDialogOpen(false);
    }
  };

  const confirmIncomeVerification = async (verificationStatus) => {
    try {
      const response = await updateIncomeDetails(id, verificationStatus);
      if (response.success) {
        setIsIncomeVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating income verification status:", err);
    } finally {
      setIsIncomeDialogOpen(false);
    }
  };

  const openModalWithId = () => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const openIncomeModalWithId = () => {
    setSelectedId(id);
    setIsIncomeModalOpen(true);
  };

  return (
    <div>
      <Base>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Personal Information
                  </Heading>
                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'personal')}>
                  {isVerified ? "Verified" : "Not Verified"}
                </Button>

                {/* <Button
                  ml="auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModalWithId();
                  }}
                  colorScheme="blue"
                  size="sm"
                >
                  Edit
                </Button>

                <Button
                  ml={2}
                  colorScheme={isVerified ? "green" : "red"}
                  size="sm"
                  onClick={handleVerifyClick}
                >
                  {isVerified ? "Verified" : "Not Verified"}
                </Button> */}

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Candidate Name (As Per SSC Marksheet)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.candidateName === null ? "NA" : viewData?.candidateName}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Email
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.email === null ? "NA" : viewData?.email}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Mobile (Student WhatsApp Number)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.whatsappNumber === null ? "NA" : viewData?.whatsappNumber}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    College Ref Code
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.referenceId === null ? "NA" : viewData?.referenceId}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

        {/* Verification Confirmation Dialog
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Verification
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to verify this student?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="green" onClick={confirmVerification} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog> */}


          <AccordionItem>
            <h2>
            <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Income Details
                  </Heading>
                </Box>
                
                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openIncomeModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isIncomeVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'income')}>
                  {isIncomeVerified ? "Verified" : "Not Verified"}
                </Button>

                {/* <button
        style={{
          marginLeft: "auto",
          padding: "5px 10px",
          fontSize: "14px",
          backgroundColor: "#3182CE",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          openIncomeModalWithId();
        }}
      >
        Edit
      </button> */}
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Annual Income
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.annualIncome === null
                      ? "NA"
                      : viewData?.annualIncome}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do you have income certificate ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeCertYesNo === null
                      ? "NA"
                      : viewData?.incomeCertYesNo}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income Certificate Number 
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeCertNumber === null
                      ? "NA"
                      : viewData?.incomeCertNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income certificate issuing authority
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeIssuingAuthority === null
                      ? "NA"
                      : viewData?.incomeIssuingAuthority}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income certificate issuing date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeIssueDate === null
                      ? "NA"
                      : viewData?.incomeIssueDate}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
            <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Current Course
                  </Heading>
                </Box>
 <Button
                  ml="auto"
                  onClick={() => setIsCurrentCourseDialogOpen(true)}
                  colorScheme="blue"
                  size="sm"
                >
                  Verify
                </Button>
                <Button
                  ml={2}
                  colorScheme={isCurrentCourseVerified ? "green" : "red"}
                  size="sm"
                >
                  {isCurrentCourseVerified ? "Verified" : "Not Verified"}
                </Button>

                <button
        style={{
          marginLeft: "auto",
          padding: "5px 10px",
          fontSize: "14px",
          backgroundColor: "#3182CE",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          openCurrentCourseModalWithId();
        }}
      >
        Edit
      </button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Year In Current Course
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionYear === null
                      ? "NA"
                      : viewData?.admissionYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteState === null
                      ? "NA"
                      : viewData?.instituteState}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteDistrict === null
                      ? "NA"
                      : viewData?.instituteDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteTaluka === null
                      ? "NA"
                      : viewData?.instituteTaluka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Qualification Level
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.qualificationLevel === null
                      ? "NA"
                      : viewData?.qualificationLevel}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Course Stream
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.courseStream === null
                      ? "NA"
                      : viewData?.courseStream}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteName === null
                      ? "NA"
                      : viewData?.instituteName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Course name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.coursename === null
                      ? "NA"
                      : viewData?.coursename}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionType === null
                      ? "NA"
                      : viewData?.admissionType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    CET / JEE Percentage
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.cetPercentAge === null
                      ? "NA"
                      : viewData?.cetPercentAge}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Application Admission ID/CAP ID/CLAT Admit Card No
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionApplicationId === null
                      ? "NA"
                      : viewData?.admissionApplicationId}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Letter Doc
                  </Heading>

                  <Link
                    href={
                      viewData?.admissionLetterDoc === null
                        ? "NA"
                        : viewData?.admissionLetterDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Year Of Study
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.currentYear === null
                      ? "NA"
                      : viewData?.currentYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Year Of Study Completed Or Pursuing
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isCompletedPursuing === null
                      ? "NA"
                      : viewData?.isCompletedPursuing}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionDate === null
                      ? "NA"
                      : viewData?.admissionDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Fees Paid
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.feesPaid === null ? "NA" : viewData?.feesPaid}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Upload Fees/Admission Receipt/bonafide certificate
                  </Heading>

                  <Link
                    href={
                      viewData?.feeReceiptDoc === null
                        ? "NA"
                        : viewData?.feeReceiptDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Upload Fees/Admission Receipt/bonafide certificate
                  </Heading>

                  <Link
                    href={
                      viewData?.feeReceiptDoc === null
                        ? "NA"
                        : viewData?.feeReceiptDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Admission Through Open Or Reserved Category ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionCategory === null
                      ? "NA"
                      : viewData?.admissionCategory}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mode Of Study
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.modeStudy === null ? "NA" : viewData?.modeStudy}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
            <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Hostel Details 
                  </Heading>
                </Box>
                <button
        style={{
          marginLeft: "auto",
          padding: "5px 10px",
          fontSize: "14px",
          backgroundColor: "#3182CE",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          openHostelModalWithId();
        }}
      >
        Edit
      </button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Are you a Hosteller or Day Scholar
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.areYouHostellerDayScholar === null
                      ? "NA"
                      : viewData?.areYouHostellerDayScholar}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelType === null
                      ? "NA"
                      : viewData?.hostelType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel/ P.G/Rented House Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPgName === null
                      ? "NA"
                      : viewData?.hostelPgName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel/ P.G/Rented House Address
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPgAddress === null
                      ? "NA"
                      : viewData?.hostelPgAddress}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Pin Code
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPgPincode === null
                      ? "NA"
                      : viewData?.hostelPgPincode}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Admission Date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelAdmissionDate === null
                      ? "NA"
                      : viewData?.hostelAdmissionDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is mess available ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isMessAvailable === null
                      ? "NA"
                      : viewData?.isMessAvailable}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Rent per month ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.rentPerMonth === null
                      ? "NA"
                      : viewData?.rentPerMonth}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
            <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Scheme Wise Details
                  </Heading>
                </Box>
                <button
        style={{
          marginLeft: "auto",
          padding: "5px 10px",
          fontSize: "14px",
          backgroundColor: "#3182CE",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          openSchemeModalWithId();
        }}
      >
        Edit
      </button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Previous year application id
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.previousYearApplicationId === null
                      ? "NA"
                      : viewData?.previousYearApplicationId}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Number of beneficiary in family ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.numberOfBeneficiaryInFamily === null
                      ? "NA"
                      : viewData?.numberOfBeneficiaryInFamily}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    How many boy child ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.howManyBoysChild === null
                      ? "NA"
                      : viewData?.howManyBoysChild}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is your parent AlphaBhuDharak
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isYourParentAlphabhudarak === null
                      ? "NA"
                      : viewData?.isYourParentAlphabhudarak}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is your parent registered labour ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isRegisteredLabour === null
                      ? "NA"
                      : viewData?.isRegisteredLabour}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admitted under EWS ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admittedUnderEws === null
                      ? "NA"
                      : viewData?.admittedUnderEws}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

        </Accordion>
          
        <PersonalInfoVerificationDialog
          isOpen={isPersonalDialogOpen}
          onClose={() => setIsPersonalDialogOpen(false)}
          onConfirm={confirmPersonalVerification}
        />

        <IncomeDetailsVerificationDialog
          isOpen={isIncomeDialogOpen}
          onClose={() => setIsIncomeDialogOpen(false)}
          onConfirm={confirmIncomeVerification}
        />

        <CurrentCourseDialog
          isOpen={isCurrentCourseDialogOpen}
          onClose={() => setIsCurrentCourseDialogOpen(false)}
          onConfirm={confirmCurrentCourseVerification}
        />

        <Edit_Prsnl_Renewal_Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={selectedId} />
        {/* <Upload_Document_Modal isOpen={isModalOpenUpload} onClose={() => setisModalOpenUpload(false)}  /> */}
        <Edit_Income_Renewal_Modal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)} id={selectedId} />
        {/* <Edit_Current_Course_Renewal_Modal isOpen={isCurrentCourseModalOpen} onClose={() => setIsCurrentCourseModalOpen(false)} id={selectedId} />
        <Edit_Hostel_Renewal_Modal isOpen={isHostelModalOpen} onClose={() => setIsHostelModalOpen(false)} id={selectedId} />
        <Edit_Scheme_Renewal_Modal isOpen={isSchemeModalOpen} onClose={() => setIsSchemeModalOpen(false)} id={selectedId} /> */}

      </Base>
    </div>
  );
}

export default viewRenewalStudents;