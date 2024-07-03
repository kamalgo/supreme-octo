// import React from 'react'

// const CDashboard = () => {
//   return (
//     <div>CDashboard</div>
//   )
// }

// export default CDashboard

///////////////////////////////////////////

// import React from 'react';
// import {
//   Box,
//   Heading,
//   Flex,
//   Spacer,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   useToast,
// } from "@chakra-ui/react";
// import { ChevronRightIcon } from "@chakra-ui/icons";
// import { NavLink } from 'react-router-dom';

// const CDashboard = () => {
//   const toast = useToast();

//   const handleButtonClick = () => {
//     toast({
//       title: "Action Triggered",
//       description: "You clicked the button",
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   return (
//     <Box py={5} px={5} bg={"gray.100"} borderWidth="1px" borderRadius="lg">
//       <Flex>
//         <Box>
//           <Heading as="h4" size={"md"} my={2}>
//             College Dashboard
//           </Heading>
//           <Breadcrumb
//             spacing="8px"
//             separator={<ChevronRightIcon color="gray.500" />}
//             fontSize={15}
//           >
//             <BreadcrumbItem>
//               <BreadcrumbLink>
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbItem isCurrentPage>
//               <BreadcrumbLink>College Dashboard</BreadcrumbLink>
//             </BreadcrumbItem>
//           </Breadcrumb>
//         </Box>
//         <Spacer />
//         <Box>
//           <Button colorScheme="teal" onClick={handleButtonClick}>
//             Trigger Action
//           </Button>
//         </Box>
//       </Flex>
//     </Box>
//   );
// }

// export default CDashboard;


import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { NavLink } from 'react-router-dom';
import Base from "../../components/Base"; // Make sure this import path is correct based on your project structure

const CDashboard = () => {
  const toast = useToast();

  const handleButtonClick = () => {
    toast({
      title: "Action Triggered",
      description: "You clicked the button",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Base>
      <Box py={5} px={5} bg={"gray.100"} borderWidth="1px" borderRadius="lg">
        <Flex>
          <Box>
            <Heading as="h4" size={"md"} my={2}>
              College Dashboard
            </Heading>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontSize={15}
            >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>College Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme="teal" onClick={handleButtonClick}>
              Trigger Action
            </Button>
          </Box>
        </Flex>
      </Box>
    </Base>
  );
}

export default CDashboard;
