// import React from "react";
// import {
//   IconButton,
//   Box,
//   CloseButton,
//   Flex,
//   HStack,
//   VStack,
//   Icon,
//   useColorModeValue,
//   Link,
//   Drawer,
//   DrawerContent,
//   Text,
//   useDisclosure,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/react";
// import { FiMenu, FiChevronDown } from "react-icons/fi";
// import { NavLink, useHistory, withRouter } from "react-router-dom";
// import { MdDashboard, MdGroup, MdCameraRoll } from "react-icons/md";
// import { signout, isAuthenticated } from "../helpers/AuthHelpers";
// import ROLES from "../helpers/Roles";

// const AdminMenu = [
//   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/admin" },
//   { name: "Users", icon: MdGroup, path: "/dashboard/admin/users" },
//   { name: "Year and Course", icon: MdCameraRoll, path: "/dashboard/admin/year_course" },
//   { name: "Colleges", icon: MdGroup, path: "/dashboard/admin/colleges" },
//   { name: "Streams", icon: MdGroup, path: "/dashboard/admin/streams" },
//   { name: "Upload", icon: MdCameraRoll, path: "/dashboard/admin/upload" },
//   { name: "Students", icon: MdGroup, path: "/dashboard/admin/student" },
//   { name: "Pending", icon: MdCameraRoll, path: "/dashboard/admin/pending" },
//   { name: "Submited", icon: MdCameraRoll, path: "/dashboard/admin/submited" },
//   { name: "Bulk Upload", icon: MdCameraRoll, path: "/dashboard/admin/bulkupload" },
//   { name: "SC Tracker", icon: MdGroup, path: "/dashboard/admin/sctracker" },
//   { name: "Payments", icon: MdGroup, path: "/dashboard/admin/payments" },
//   { name: "Tranch Tracker", icon: MdGroup, path: "/dashboard/admin/ttcollege" },
// ];

// const CollegeMenu = [
//   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/college" },
//   { name: "TT College", icon: MdGroup, path: "/dashboard/college/ttcollege" },
//   // Add more college-specific items here
// ];

// function Navbar({ children, history }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
//       <SidebarContent
//         valuehistory={history}
//         onClose={() => onClose}
//         display={{ base: "none", md: "block" }}
//       />
//       <Drawer
//         autoFocus={false}
//         isOpen={isOpen}
//         placement="left"
//         onClose={onClose}
//         returnFocusOnClose={false}
//         onOverlayClick={onClose}
//         size="full"
//       >
//         <DrawerContent>
//           <SidebarContent onClose={onClose} valuehistory={history} />
//         </DrawerContent>
//       </Drawer>
//       <MobileNav onOpen={onOpen} />
//       <Box ml={{ base: 0, md: 60 }} p="5">
//         {children}
//       </Box>
//     </Box>
//   );
// }

// export default withRouter(Navbar);

// const SidebarContent = ({ onClose, valuehistory, ...rest }) => {
//   const { user } = isAuthenticated();
//   const role = user.role;

//   const getMenu = () => {
//     switch (role) {
//       case ROLES.ADMIN:
//         return AdminMenu;
//       case ROLES.COLLEGE:
//         return CollegeMenu;
//       // case ROLES.ANALYST:
//       //   return AnalystMenu;
//       // case ROLES.UMPIRE:
//       //   return CommiteeMenu;
//       // case ROLES.COMMITTEE:
//       //   return UmpireMenu;
//       default:
//         return [];
//     }
//   };

//   const LinkItems = getMenu();

//   return (
//     <Box
//       transition="3s ease"
//       bg="primary.main"
//       borderRight="1px"
//       borderRightColor="primary.main"
//       w={{ base: "full", md: 60 }}
//       pos="fixed"
//       h="full"
//       {...rest}
//     >
//       <Flex h="20" alignItems="center" mx="8" marginBottom={10}>
//         <Text
//           fontSize="2xl"
//           fontFamily="monospace"
//           fontWeight="bold"
//           color="text.light"
//           ml={3}
//         >
//           Forstu
//         </Text>
//         <CloseButton
//           display={{ base: "flex", md: "none" }}
//           onClick={onClose}
//           color="text.light"
//         />
//       </Flex>

//       {LinkItems.map((link, index) => (
//         <NavItem
//           history={valuehistory}
//           path={link.path}
//           key={index}
//           icon={link.icon}
//         >
//           <Text>
//             <NavLink to={link.path}>{link.name}</NavLink>
//           </Text>
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

// const NavItem = ({ icon, children, history, path, ...rest }) => {
//   return (
//     <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         bg={history?.location?.pathname === path ? "white" : "primary.main"}
//         color={history?.location?.pathname === path ? "primary.main" : "white"}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             color={
//               history?.location?.pathname === path ? "primary.main" : "white"
//             }
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   );
// };

// const MobileNav = ({ onOpen, ...rest }) => {
//   const navigate = useHistory();

//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 4 }}
//       height="20"
//       alignItems="center"
//       bg={useColorModeValue("white", "gray.900")}
//       borderBottomWidth="1px"
//       borderBottomColor={useColorModeValue("gray.200", "gray.700")}
//       justifyContent={{ base: "space-between", md: "flex-end" }}
//       {...rest}
//     >
//       <IconButton
//         display={{ base: "flex", md: "none" }}
//         onClick={onOpen}
//         variant="outline"
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />
//       <Text
//         display={{ base: "flex", md: "none" }}
//         fontSize="2xl"
//         fontFamily="monospace"
//         fontWeight="bold"
//       >
//         Forstu
//       </Text>
//       <HStack spacing={{ base: "0", md: "6" }}>
//         <Flex alignItems={"center"}>
//           <Menu>
//             <MenuButton
//               py={2}
//               transition="all 0.3s"
//               _focus={{ boxShadow: "none" }}
//             >
//               <HStack>
//                 <VStack
//                   display={{ base: "none", md: "flex" }}
//                   alignItems="flex-start"
//                   spacing="1px"
//                   ml="2"
//                 >
//                   <Text fontSize="sm">{user?.name || ""}</Text>
//                   <Text fontSize="xs" color="gray.600">
//                     {user?.email || ""}
//                   </Text>
//                 </VStack>
//                 <Box display={{ base: "none", md: "flex" }}>
//                   <FiChevronDown />
//                 </Box>
//               </HStack>
//             </MenuButton>
//             <MenuList
//               bg={useColorModeValue("white", "gray.900")}
//               borderColor={useColorModeValue("gray.200", "gray.700")}
//             >
//               <MenuItem>
//                 {/* Add profile link or other items if needed */}
//               </MenuItem>
//               <MenuDivider />
//               <MenuItem
//                 onClick={() => {
//                   signout(() => {
//                     navigate.replace("/");
//                   });
//                 }}
//               >
//                 Sign out
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         </Flex>
//       </HStack>
//     </Flex>
//   );
// };

////////////////////////////////////////////////////////////////////////////////

// import React from "react";

// import {
//   IconButton,
//   Box,
//   CloseButton,
//   Flex,
//   HStack,
//   VStack,
//   Icon,
//   useColorModeValue,
//   Link,
//   Drawer,
//   DrawerContent,
//   Text,
//   useDisclosure,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/react";

// import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";

// import { NavLink, useHistory, withRouter } from "react-router-dom";

// import { MdDashboard, MdGroup, MdCameraRoll } from "react-icons/md";

// import { signout } from "../helpers/AuthHelpers";

// import ROLES from "../helpers/Roles";

// const AdminMenu = [
//   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/admin" },

//   { name: "Users", icon: MdGroup, path: "/dashboard/admin/users" },

//   {
//     name: "Year and Course",
//     icon: MdCameraRoll,
//     path: "/dashboard/admin/year_course",
//   },

//   { name: "Colleges", icon: MdGroup, path: "/dashboard/admin/colleges" },

//   { name: "Streams", icon: MdGroup, path: "/dashboard/admin/streams" },

//   { name: "Upload", icon: MdCameraRoll, path: "/dashboard/admin/upload" },
//   { name: "Students", icon: MdGroup, path: "/dashboard/admin/student" },

//   { name: "Pending", icon: MdCameraRoll, path: "/dashboard/admin/pending" },
//   { name: "Submited", icon: MdCameraRoll, path: "/dashboard/admin/submited" },
  
//   { name: "Bulk Upload", icon: MdCameraRoll, path: "/dashboard/admin/bulkupload" },

//   { name: "SC Tracker", icon: MdGroup, path: "/dashboard/admin/sctracker" },

//   { name: "Payments", icon: MdGroup, path: "/dashboard/admin/payments" },

//   { name: "Tranch Tracker", icon: MdGroup, path: "/dashboard/admin/ttcollege" },


//   // { name: "Seasons", icon: MdSportsCricket, path: "/dashboard/admin/seasons" },
// ];

// const CollegeMenu = [
//   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/admin/sctracker" },

//   { name: "Videos", icon: MdCameraRoll, path: "/dashboard/admin/sctracker" },
// ];




// // const AnalystMenu = [
// //   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/analyst" },

// //   { name: "Videos", icon: MdCameraRoll, path: "/dashboard/analyst/videos" },
// // ];

// // const UmpireMenu = [
// //   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/committee" },

// //   { name: "Videos", icon: MdCameraRoll, path: "/dashboard/committee/videos" },
// // ];

// // const CommiteeMenu = [
// //   { name: "Dashboard", icon: MdDashboard, path: "/dashboard/umpire" },

// //   { name: "Videos", icon: MdCameraRoll, path: "/dashboard/umpire/videos" },
// // ];

// function Navbar({ children, history }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
//       <SidebarContent
//         valuehistory={history}
//         onClose={() => onClose}
//         display={{ base: "none", md: "block" }}
//       />

//       <Drawer
//         autoFocus={false}
//         isOpen={isOpen}
//         placement="left"
//         onClose={onClose}
//         returnFocusOnClose={false}
//         onOverlayClick={onClose}
//         size="full"
//       >
//         <DrawerContent>
//           <SidebarContent onClose={onClose} valuehistory={history} />
//         </DrawerContent>
//       </Drawer>

//       {/* mobilenav */}

//       <MobileNav onOpen={onOpen} />

//       <Box ml={{ base: 0, md: 60 }} p="5">
//         {children}
//       </Box>
//     </Box>
//   );
// }

// export default withRouter(Navbar);

// const SidebarContent = ({ onClose, valuehistory, ...rest }) => {
//   // const { role } = isAuthenticated().user;
//   const role = "COLLEGE";

//   const getMenu = () => {
//     switch (role) {
//       case ROLES.ADMIN:
//         return AdminMenu;

//         case ROLES.COLLEGE:
//           return CollegeMenu;
//       // case ROLES.ANALYST:
//       //   return AnalystMenu;

//       // case ROLES.UMPIRE:
//       //   return CommiteeMenu;

//       // case ROLES.COMMITTEE:
//       //   return UmpireMenu;
//     }
//   };

//   const LinkItems = getMenu();

//   return (
//     <Box
//       transition="3s ease"
//       bg="primary.main"
//       borderRight="1px"
//       borderRightColor="primary.main"
//       w={{ base: "full", md: 60 }}
//       pos="fixed"
//       h="full"
//       {...rest}
//     >
//       <Flex h="20" alignItems="center" mx="8" marginBottom={10}>
//         {/* <Box boxSize="100px" objectFit="cover">
//           <img src="https://www.forstu.co/external/img/logo3.png" alt="" />
//         </Box> */}

//         <Text
//           fontSize="2xl"
//           fontFamily="monospace"
//           fontWeight="bold"
//           color="text.light"
//           ml={3}
//         >
//           Forstu
//         </Text>

//         <CloseButton
//           display={{ base: "flex", md: "none" }}
//           onClick={onClose}
//           color="text.light"
//         />
//       </Flex>

//       {LinkItems.map((link, index) => (
//         <NavItem
//           history={valuehistory}
//           path={link.path}
//           key={index}
//           icon={link.icon}
//         >
//           <Text>
//             <NavLink to={link.path}>{link.name}</NavLink>
//           </Text>
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

// const NavItem = ({ icon, children, history, path, ...rest }) => {
//   return (
//     <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         bg={history?.location?.pathname === path ? "white" : "primary.main"}
//         color={history?.location?.pathname === path ? "primary.main" : "white"}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             color={
//               history?.location?.pathname === path ? "primary.main" : "white"
//             }
//             as={icon}
//           />
//         )}

//         {children}
//       </Flex>
//     </Link>
//   );
// };

// const MobileNav = ({ onOpen, ...rest }) => {
//   const navigate = useHistory();

//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 4 }}
//       height="20"
//       alignItems="center"
//       bg={useColorModeValue("white", "gray.900")}
//       borderBottomWidth="1px"
//       borderBottomColor={useColorModeValue("gray.200", "gray.700")}
//       justifyContent={{ base: "space-between", md: "flex-end" }}
//       {...rest}
//     >
//       <IconButton
//         display={{ base: "flex", md: "none" }}
//         onClick={onOpen}
//         variant="outline"
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />

//       <Text
//         display={{ base: "flex", md: "none" }}
//         fontSize="2xl"
//         fontFamily="monospace"
//         fontWeight="bold"
//       >
//         Forstu
//       </Text>

//       <HStack spacing={{ base: "0", md: "6" }}>
//         {/* <IconButton
//           size="lg"
//           variant="ghost"
//           aria-label="open menu"
//           icon={<FiBell />}
//         /> */}

//         <Flex alignItems={"center"}>
//           <Menu>
//             <MenuButton
//               py={2}
//               transition="all 0.3s"
//               _focus={{ boxShadow: "none" }}
//             >
//               <HStack>
//                 {/* <Avatar name={username} size={"xs"} /> */}

//                 <VStack
//                   display={{ base: "none", md: "flex" }}
//                   alignItems="flex-start"
//                   spacing="1px"
//                   ml="2"
//                 >
//                   <Text fontSize="sm">{}</Text>

//                   <Text fontSize="xs" color="gray.600">
//                     {/* {username} */}
//                   </Text>
//                 </VStack>

//                 <Box display={{ base: "none", md: "flex" }}>
//                   <FiChevronDown />
//                 </Box>
//               </HStack>
//             </MenuButton>

//             <MenuList
//               bg={useColorModeValue("white", "gray.900")}
//               borderColor={useColorModeValue("gray.200", "gray.700")}
//             >
//               <MenuItem>
//                 {/* <Text>
//                   <NavLink to="/profile">Profile</NavLink>
//                 </Text> */}
//               </MenuItem>

//               <MenuDivider />

//               <MenuItem
//                 onClick={() => {
//                   signout(() => {
//                     navigate.replace("/");
//                   });
//                 }}
//               >
//                 Sign out
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         </Flex>
//       </HStack>
//     </Flex>
//   );
// };


import React, { useEffect } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem, // Add MenuItem import
  HStack,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { MdDashboard, MdGroup, MdCameraRoll } from "react-icons/md";
import { isAuthenticated, signout } from "../helpers/AuthHelpers";
import ROLES from "../helpers/Roles";
import { NavLink, useHistory, withRouter } from "react-router-dom";

const AdminMenu = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard/admin" },
  { name: "Users", icon: MdGroup, path: "/dashboard/admin/users" },
  { name: "Year and Course", icon: MdCameraRoll, path: "/dashboard/admin/year_course" },
  { name: "Colleges", icon: MdGroup, path: "/dashboard/admin/colleges" },
  { name: "Streams", icon: MdGroup, path: "/dashboard/admin/streams" },
  { name: "Upload", icon: MdCameraRoll, path: "/dashboard/admin/upload" },
  { name: "Students", icon: MdGroup, path: "/dashboard/admin/student" },
  { name: "Pending", icon: MdCameraRoll, path: "/dashboard/admin/pending" },
  { name: "Submitted", icon: MdCameraRoll, path: "/dashboard/admin/submitted" },
  { name: "Bulk Upload", icon: MdCameraRoll, path: "/dashboard/admin/bulkupload" },
  { name: "SC Tracker", icon: MdGroup, path: "/dashboard/admin/sctracker" },
  { name: "Payments", icon: MdGroup, path: "/dashboard/admin/payments" },
  { name: "Tranch Tracker", icon: MdGroup, path: "/dashboard/admin/ttcollege" },
];

const CollegeMenu = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard/college" },
  { name: "TT College", icon: MdGroup, path: "/dashboard/college/ttcollege" },
  // Add more college-specific items here
];

function Navbar({ children, history }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* <SidebarContent valuehistory={history} onClose={onClose} /> */}
      <SidebarContent onClose={onClose} valuehistory={history} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} valuehistory={history} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="5">
        {children}
      </Box>
    </Box>
  );
}

export default withRouter(Navbar);



const SidebarContent = ({ onClose, valuehistory }) => {
  const { user } = isAuthenticated();

  useEffect(() => {
    console.log("SidebarContent user role:", user?.role);
  }, [user]); // Ensure 'user' is in dependency array if it's used inside useEffect

  const role = user.role;
// const SidebarContent = ({ onClose, valuehistory }) => {
//   const { user } = isAuthenticated();
//   console.log("newwww user", user.role);
//   const role = user.role;

  const getMenu = () => {
    switch (role) {
      case ROLES.ADMIN:
        return AdminMenu;
      case ROLES.COLLEGE:
        return CollegeMenu;
      default:
        return [];
    }
  };

  const LinkItems = getMenu();

  return (
    <Box
      transition="3s ease"
      bg="primary.main"
      borderRight="1px"
      borderRightColor="primary.main"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" marginBottom={10}>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="text.light" ml={3}>
          Forstu
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          color="text.light"
        />
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem history={valuehistory} path={link.path} key={index} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, history, path }) => {
  return (
    <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={history?.location?.pathname === path ? "white" : "primary.main"}
        color={history?.location?.pathname === path ? "primary.main" : "white"}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={history?.location?.pathname === path ? "primary.main" : "white"}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen }) => {
  const navigate = useHistory();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Forstu
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() => {
                  signout(() => {
                    navigate.replace("/");
                  });
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
