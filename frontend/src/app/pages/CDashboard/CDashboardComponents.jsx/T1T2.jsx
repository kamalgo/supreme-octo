//this code prints Tranche 1 and Tranche 2 count

import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { getForstuTranchOneCountApi, getForstuTranchTwoCountApi } from "../../../api/DashboardApi/CDashboardApi";

function Total() {
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalReceivable, setTotalReceivable] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total receivable amount
        const receivableResponse = await getForstuTranchOneCountApi();
        if (receivableResponse && receivableResponse.success) {
          setTotalReceivable(receivableResponse.count); // Updated to use 'totalAmount'
        } else {
          setTotalReceivable(0);
        }

        // Fetch total received amount
        const receivedResponse = await getForstuTranchTwoCountApi();
        if (receivedResponse && receivedResponse.success) {
          setTotalReceived(receivedResponse.count);
        } else {
          setTotalStudent(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, set defaults or show error message
        setTotalReceivable(0);
        setTotalReceived(0);
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
          <StatLabel>Tranche 1 Received</StatLabel>
          <StatNumber>{totalReceivable}</StatNumber> {/* Updated to use totalReceivable */}
        </Stat>
      </Box>

      <Box bg="#FFE7C1" p="20px" borderRadius="20px">
        <Stat>
          <StatLabel>Tranche 2 Received</StatLabel>
          <StatNumber>{totalReceived}</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}

export default Total;
