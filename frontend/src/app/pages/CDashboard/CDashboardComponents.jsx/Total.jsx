import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import {
  getCandidatesCountApi,
  getForstuTranchesCountApi,
} from "../../../api/DashboardApi/CDashboardApi";

function Total() {
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalEligible, setTotalEligible] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total eligible students
        const eligibleResponse = await getCandidatesCountApi();
        if (eligibleResponse && eligibleResponse.success) {
          setTotalEligible(eligibleResponse.count);
        } else {
          setTotalEligible(0);
        }

        // Fetch total scholarship beneficiaries
        const totalStudentsResponse = await getForstuTranchesCountApi();
        if (totalStudentsResponse && totalStudentsResponse.success) {
          setTotalStudent(totalStudentsResponse.count);
        } else {
          setTotalStudent(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, set defaults or show error message
        setTotalEligible(0);
        setTotalStudent(0);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      h="400px"
      padding="10px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box mb="20px" bg="#FFE7C1" p="20px" borderRadius="20px">
        <Stat>
          <StatLabel>Total Enrolled Students</StatLabel>
          <StatNumber>{totalEligible}</StatNumber>
        </Stat>
      </Box>

      <Box bg="#FFE7C1" p="20px" borderRadius="20px">
        <Stat>
          <StatLabel>Scholarship Beneficiaries</StatLabel>
          <StatNumber>{totalStudent}</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}

export default Total;
