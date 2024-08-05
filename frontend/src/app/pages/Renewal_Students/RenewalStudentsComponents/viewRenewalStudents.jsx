import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Base from "../../../components/Base";
import { studentprofileviewApi } from "../../../api/Student/StudentApis";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Heading, SimpleGrid, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Import ExternalLinkIcon from Chakra UI
import { renewalStudentProfileView } from "../../../api/RenewalStudentsApi/RenewalStudentsApi";
import Edit_Prsnl_Renewal_Modal from "./Edit_Prsnl_Renewal_Modal";
import Edit_Income_Renewal_Modal from "./Edit_Income_Renewal_Modal";
import Edit_Current_Course_Renewal_Modal from "./Edit_Current_Course_Renewal_Modal"
import Edit_Hostel_Renewal_Modal from "./Edit_Hostel_Renewal_Modal"

function viewRenewalStudents() {
  

  //modal for edit personal 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [viewData, setViewData] = useState([]);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isCurrentCourseModalOpen, setIsCurrentCourseModalOpen] = useState(false);
  const [isHostelModalOpen, setIsHostelModalOpen] = useState(false);

  
  //modal for upload
  const [isModalOpenUpload,setisModalOpenUpload] = useState(false);


  // const location = useLocation();

  const { id } = useParams();
  console.log("my id", id);

//   console.log(location.state?.id);
  
//   if (!location.state?.id) {
//     return <div>No data</div>;
//   }

  const getprofileviewFunction = () => {
    console.log("getprofileviewFunction called!!!");
    let data = {
      id: id,
    };
    renewalStudentProfileView(data)
      .then((res) => {
        console.log("Student profile view data:", res.data);
        setViewData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching student profile view data:", err);
      });
  };

  useEffect(() => {
    getprofileviewFunction();
  }, []);

  console.log("viewData", viewData.admissionType);

  const openModalWithId = () => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handlesetisModalOpenUpload = () => {
    console.log("intel inside");
    setisModalOpenUpload(true);
  };

  console.log("Selected ID:", id);

  const openIncomeModalWithId = () => {
    setSelectedId(id);
    setIsIncomeModalOpen(true);
  };

  const openCurrentCourseModalWithId = () => {
    setSelectedId(id);
    setIsCurrentCourseModalOpen(true);
  };

  const openHostelModalWithId = () => {
    setSelectedId(id);
    setIsHostelModalOpen(true);
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
    openModalWithId();
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
                    Candidate Name (As Per SSC Marksheet)
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.candidateName === null
                      ? "NA"
                      : viewData?.candidateName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Email
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.email === null ? "NA" : viewData?.email}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mobile (Student WhatsApp Number)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.whatsappNumber === null
                      ? "NA"
                      : viewData?.whatsappNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    College Ref Code
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.referenceId === null
                      ? "NA"
                      : viewData?.referenceId}
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
                    Income Details
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
          openIncomeModalWithId();
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
            <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Current Course
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
        </Accordion>
        <Edit_Prsnl_Renewal_Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={selectedId} />
        {/* <Upload_Document_Modal isOpen={isModalOpenUpload} onClose={() => setisModalOpenUpload(false)}  /> */}
        <Edit_Income_Renewal_Modal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)} id={selectedId} />
        <Edit_Current_Course_Renewal_Modal isOpen={isCurrentCourseModalOpen} onClose={() => setIsCurrentCourseModalOpen(false)} id={selectedId} />
        <Edit_Hostel_Renewal_Modal isOpen={isHostelModalOpen} onClose={() => setIsHostelModalOpen(false)} id={selectedId} />

      </Base>
    </div>
  );
}

export default viewRenewalStudents;