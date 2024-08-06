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

const Edit_Scheme_Renewal_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    previousYearApplicationId: '',
    numberOfBeneficiaryInFamily: '',
    howManyBoysChild: '',
    isYourParentAlphabhudarak: '',
    isRegisteredLabour: '',
    admittedUnderEws: ''
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
        title: "Scheme details updated.",
        description: "The scheme details have been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal after successful submission
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update scheme details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating scheme details:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Scheme Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Previous Year Application ID</FormLabel>
              <Input name="previousYearApplicationId" value={formData.previousYearApplicationId} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Number of Beneficiary in Family</FormLabel>
              <Input name="numberOfBeneficiaryInFamily" value={formData.numberOfBeneficiaryInFamily} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>How Many Boys Child</FormLabel>
              <Input name="howManyBoysChild" value={formData.howManyBoysChild} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Is Your Parent Alphabhudarak</FormLabel>
              <Input name="isYourParentAlphabhudarak" value={formData.isYourParentAlphabhudarak} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Is Registered Labour</FormLabel>
              <Input name="isRegisteredLabour" value={formData.isRegisteredLabour} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admitted Under EWS</FormLabel>
              <Input name="admittedUnderEws" value={formData.admittedUnderEws} onChange={handleChange} />
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

export default Edit_Scheme_Renewal_Modal;
