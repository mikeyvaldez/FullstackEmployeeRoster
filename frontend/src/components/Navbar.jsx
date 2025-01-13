import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";


export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"900px"}>
      <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex alignItems={"center"} justifyContent={"center"} gap={3} display={{base:"none", sm:"flex"}}>
            <Text fontSize={"50px"} color={"green.300"}>Employee Roster</Text>
          </Flex>

          {/* Right Side */}
          <Flex gap={3} alignItems={"center"}>
            <Text fontSize={"lg"} fontWeight={500} display={{base: "none", md: "block"}}>
                PLACEHOLDER
            </Text>

            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
            </Button>
            <CreateUserModal />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
