import React, { useState } from 'react';
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

import { editRenewalStudentApi } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

const Edit_Hostel_Renewal_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    areYouHostellerDayScholar: '',
    hostelType: '',
    hostelPgName: '',
    hostelPgAddress: '',
    hostelPgPincode: '',
    hostelAdmissionDate: '',
    isMessAvailable: '',
    rentPerMonth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id,
        ...formData
      };
      await editRenewalStudentApi(payload);
      toast({
        title: "Hostel details updated.",
        description: "The hostel details have been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal after successful submission
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update hostel details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating hostel details:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Hostel Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Hosteller or Day Scholar</FormLabel>
              <Input name="areYouHostellerDayScholar" value={formData.areYouHostellerDayScholar} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel Type</FormLabel>
              <Input name="hostelType" value={formData.hostelType} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel/PG Name</FormLabel>
              <Input name="hostelPgName" value={formData.hostelPgName} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel/PG Address</FormLabel>
              <Input name="hostelPgAddress" value={formData.hostelPgAddress} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel/PG Pincode</FormLabel>
              <Input name="hostelPgPincode" value={formData.hostelPgPincode} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel Admission Date</FormLabel>
              <Input type="date" name="hostelAdmissionDate" value={formData.hostelAdmissionDate} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Is Mess Available</FormLabel>
              <Input name="isMessAvailable" value={formData.isMessAvailable} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Rent Per Month</FormLabel>
              <Input name="rentPerMonth" value={formData.rentPerMonth} onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Hostel_Renewal_Modal;
