import {
  Container,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import "./homepageStyles/homepageStyles.css"

export default function HomePage() {
  const { colorMode } = useColorMode();

  return (
    <Container maxWidth="6xl" centerContent>
      <Text maxWidth="100%"  fontSize="50px" padding={18}>
        The Best Employee Management System
      </Text>
      <Text padding={10} fontSize="20">To Sign Up <a href="/registration" className="click-link">click here</a></Text>

      {/* Image section */}
      <div className="pics">
        {colorMode === "light" ? (
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F021%2F724%2F423%2Fnon_2x%2Fbusiness-team-of-employees-illustration-vector.jpg&f=1&nofb=1&ipt=5eda8e93db26227fd45096780604418a67e2db51d5b4bb37ed8d7bff2fac4bac&ipo=images" />
        ) : (
          <img className="darkMode_img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fb3%2F3b%2F25%2Fb33b2569ad41fa1d95439141090ebc8c.jpg&f=1&nofb=1&ipt=3ae9cacd873ccb141982bfc710905f8e389a927daa5d0e07119bd9de04c3cd41&ipo=images" />
        )}
      </div>
    </Container>
  );
}
