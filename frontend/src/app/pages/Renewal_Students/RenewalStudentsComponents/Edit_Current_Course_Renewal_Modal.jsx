// import React, { useState } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   useToast,
//   VStack
// } from "@chakra-ui/react";

// import { editRenewalStudentApi } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

// const Edit_Current_Course_Renewal_Modal = ({ isOpen, onClose, id }) => {
//   const toast = useToast();
//   const [formData, setFormData] = useState({
//     admissionYear: '',
//     instituteState: '',
//     instituteDistrict: '',
//     instituteTaluka: '',
//     qualificationLevel: '',
//     courseStream: '',
//     instituteName: '',
//     courseName: '',
//     admissionType: '',
//     cetPercent: '',
//     admissionApplicationId: '',
//     pastYearOfStudy: '',
//     pastYearCompletedPursuing: '',
//     presentYearOfStudy: '',
//     presentYearCompletedPursuing: '',
//     admissionYearOfThatCourse: '',
//     previousYearPercentage: '',
//     resultPassedAtkt: '',
//     admissionCasteCateogary: '',
//     admissionDateCurrentCourse: '',
//     feesPaidCurrentCourse: '',
//     isThereAnyGap: '',
//     gapReason: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id,
//         ...formData
//       };
//       await editRenewalStudentApi(payload);
//       toast({
//         title: "Current course details updated.",
//         description: "The current course details have been successfully updated.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       onClose(); // Close the modal after successful submission
//     } catch (error) {
//       toast({
//         title: "An error occurred.",
//         description: "Unable to update current course details.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       console.error("Error updating current course details:", error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="xl">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Current Course Details</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <VStack spacing={4}>
//             <FormControl>
//               <FormLabel>Admission Year</FormLabel>
//               <Input name="admissionYear" value={formData.admissionYear} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute State</FormLabel>
//               <Input name="instituteState" value={formData.instituteState} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute District</FormLabel>
//               <Input name="instituteDistrict" value={formData.instituteDistrict} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute Taluka</FormLabel>
//               <Input name="instituteTaluka" value={formData.instituteTaluka} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Qualification Level</FormLabel>
//               <Input name="qualificationLevel" value={formData.qualificationLevel} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Course Stream</FormLabel>
//               <Input name="courseStream" value={formData.courseStream} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute Name</FormLabel>
//               <Input name="instituteName" value={formData.instituteName} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Course Name</FormLabel>
//               <Input name="courseName" value={formData.courseName} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Type</FormLabel>
//               <Input name="admissionType" value={formData.admissionType} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>CET Percentage</FormLabel>
//               <Input name="cetPercent" value={formData.cetPercent} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Application ID</FormLabel>
//               <Input name="admissionApplicationId" value={formData.admissionApplicationId} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Past Year Of Study</FormLabel>
//               <Input name="pastYearOfStudy" value={formData.pastYearOfStudy} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Past Year Completed Pursuing</FormLabel>
//               <Input name="pastYearCompletedPursuing" value={formData.pastYearCompletedPursuing} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Present Year Of Study</FormLabel>
//               <Input name="presentYearOfStudy" value={formData.presentYearOfStudy} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Present Year Completed Pursuing</FormLabel>
//               <Input name="presentYearCompletedPursuing" value={formData.presentYearCompletedPursuing} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Year Of That Course</FormLabel>
//               <Input name="admissionYearOfThatCourse" value={formData.admissionYearOfThatCourse} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Previous Year Percentage</FormLabel>
//               <Input name="previousYearPercentage" value={formData.previousYearPercentage} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Result Passed/ATKT</FormLabel>
//               <Input name="resultPassedAtkt" value={formData.resultPassedAtkt} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Caste Category</FormLabel>
//               <Input name="admissionCasteCateogary" value={formData.admissionCasteCateogary} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Date Current Course</FormLabel>
//               <Input type="date" name="admissionDateCurrentCourse" value={formData.admissionDateCurrentCourse} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Fees Paid Current Course</FormLabel>
//               <Input name="feesPaidCurrentCourse" value={formData.feesPaidCurrentCourse} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Is There Any Gap</FormLabel>
//               <Input name="isThereAnyGap" value={formData.isThereAnyGap} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Gap Reason</FormLabel>
//               <Input name="gapReason" value={formData.gapReason} onChange={handleChange} />
//             </FormControl>
//           </VStack>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
//             Save
//           </Button>
//           <Button variant="ghost" onClick={onClose}>Cancel</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default Edit_Current_Course_Renewal_Modal;


import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack
} from "@chakra-ui/react";
import { editRenewalStudentApi, fetchRecordDetails } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

const Edit_Current_Course_Renewal_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    admissionYear: '',
    instituteState: '',
    instituteDistrict: '',
    instituteTaluka: '',
    qualificationLevel: '',
    courseStream: '',
    instituteName: '',
    courseName: '',
    admissionType: '',
    cetPercent: '',
    admissionApplicationId: '',
    pastYearOfStudy: '',
    pastYearCompletedPursuing: '',
    presentYearOfStudy: '',
    presentYearCompletedPursuing: '',
    admissionYearOfThatCourse: '',
    previousYearPercentage: '',
    resultPassedAtkt: '',
    admissionCasteCateogary: '',
    admissionDateCurrentCourse: '',
    feesPaidCurrentCourse: '',
    isThereAnyGap: '',
    gapReason: ''
  });

  // Fetch student data when modal opens or id changes
  useEffect(() => {
    if (isOpen && id) {
      const fetchData = async () => {
        try {
          const response = await fetchRecordDetails(id);
          if (response.success) {
            setFormData(response.data);
          } else {
            toast({
              title: "Error",
              description: response.message || "Failed to fetch current course details.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching current course details:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching current course details.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchData();
    }
  }, [isOpen, id, toast]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id,
        ...formData
      };
      const response = await editRenewalStudentApi(payload);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "Current course details updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose(); // Close the modal on successful update
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while updating current course details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating current course details:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating current course details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Current Course Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Admission Year</FormLabel>
              <Input name="admissionYear" value={formData.admissionYear} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Institute State</FormLabel>
              <Input name="instituteState" value={formData.instituteState} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Institute District</FormLabel>
              <Input name="instituteDistrict" value={formData.instituteDistrict} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Institute Taluka</FormLabel>
              <Input name="instituteTaluka" value={formData.instituteTaluka} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Qualification Level</FormLabel>
              <Input name="qualificationLevel" value={formData.qualificationLevel} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Course Stream</FormLabel>
              <Input name="courseStream" value={formData.courseStream} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Institute Name</FormLabel>
              <Input name="instituteName" value={formData.instituteName} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input name="courseName" value={formData.courseName} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admission Type</FormLabel>
              <Input name="admissionType" value={formData.admissionType} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>CET Percentage</FormLabel>
              <Input name="cetPercent" value={formData.cetPercent} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admission Application ID</FormLabel>
              <Input name="admissionApplicationId" value={formData.admissionApplicationId} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Past Year Of Study</FormLabel>
              <Input name="pastYearOfStudy" value={formData.pastYearOfStudy} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Past Year Completed Pursuing</FormLabel>
              <Input name="pastYearCompletedPursuing" value={formData.pastYearCompletedPursuing} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Present Year Of Study</FormLabel>
              <Input name="presentYearOfStudy" value={formData.presentYearOfStudy} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Present Year Completed Pursuing</FormLabel>
              <Input name="presentYearCompletedPursuing" value={formData.presentYearCompletedPursuing} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admission Year Of That Course</FormLabel>
              <Input name="admissionYearOfThatCourse" value={formData.admissionYearOfThatCourse} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Previous Year Percentage</FormLabel>
              <Input name="previousYearPercentage" value={formData.previousYearPercentage} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Result Passed/ATKT</FormLabel>
              <Input name="resultPassedAtkt" value={formData.resultPassedAtkt} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admission Caste Category</FormLabel>
              <Input name="admissionCasteCateogary" value={formData.admissionCasteCateogary} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admission Date Current Course</FormLabel>
              <Input type="date" name="admissionDateCurrentCourse" value={formData.admissionDateCurrentCourse} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Fees Paid Current Course</FormLabel>
              <Input name="feesPaidCurrentCourse" value={formData.feesPaidCurrentCourse} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Is There Any Gap</FormLabel>
              <Input name="isThereAnyGap" value={formData.isThereAnyGap} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Gap Reason</FormLabel>
              <Input name="gapReason" value={formData.gapReason} onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Current_Course_Renewal_Modal;
