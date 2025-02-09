import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useColorMode,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default function RegistrationPage() {
  const { colorMode } = useColorMode();

  return (
    <Container maxWidth="screen" centerContent>
      <Text maxWidth="100%" marginTop={20} fontSize="50px"></Text>
      <Box
        marginTop={20}
        backgroundColor={colorMode === "light" ? "white" : "dark"}
        width="30%"
        padding={4}
        borderRadius="3xl"
        borderWidth="3px"
      >
        <Tabs variant="soft-rounded">
          <TabList marginBottom="1em">
            <Tab width="50%" color={colorMode === "dark" ? "white" : "dark"}>
              Login
            </Tab>
            <Tab width="50%" color={colorMode === "dark" ? "white" : "dark"}>
              Sign Up!
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
