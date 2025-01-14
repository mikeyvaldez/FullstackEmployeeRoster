import { Stack, Container, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx";
import UserGrid from "./components/EmployeeGrid.jsx";
import { useState } from "react";

function App() {
  // if we were using something like react context or redux we would place this state
  // in the user grid only.
  // but since it is a smaller app we pass the setEmployees to navbar and usergrid, to keep things simple
  const [employees, setEmployees] = useState([]);


  return (
    <Stack minH={"100vh"}>
      <Navbar setEmployees={setEmployees} />

      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
          color={"green.500"}
        >
          My Employees
        </Text>

        <UserGrid employees={employees} setEmployees={setEmployees}/>
      </Container>
    </Stack>
  );
}

export default App;
