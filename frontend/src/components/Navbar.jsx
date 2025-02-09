import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserContext } from "../context/userContext.jsx";
import CreateUserModal from "../components/CreateUserModal.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/navStyles.css";
import { getTokenFromCookie } from "../utils/auth.js";
import PropTypes from "prop-types";

const vite_api_url = import.meta.env.VITE_API_URL

// The navbar handles the theme
export default function Navbar({ setEmployees }) {
  const { colorMode, toggleColorMode } = useColorMode(); // Hook to get and toggle color mode
  const { isLoggedIn, userInfo, logout, setUserInfo } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

 
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDelete = async () => {
    // Confirmation before deletion
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const token = getTokenFromCookie();

        // Send DELETE request to the server to delete the current user
        const response = await fetch(`${vite_api_url}/api/delete_user`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // After successful deletion, log the user out and redirect them
          setUserInfo(null); // Clear the user info from context
          logout(); // Ensure you log the user out from the context
          navigate("/"); // Redirect to the homepage or login page
        } else {
          alert("Error deleting the account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting the account:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <Text className="title" fontSize={"50px"} color={"green.300"} onClick={() => navigate("/")}>
              E-Roster
            </Text>
          </Flex>

          {/* Right Side */}
          <Flex gap={3} alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
            </Button>

            {/* Conditionally show the dropdown icon only if the user is logged in */}
            {isLoggedIn && userInfo && (
              <>
                <div className="hamburger-container">
                  <Button className="dropbtn" onClick={toggleMenu}>
                    <Text fontSize="lg">
                      <GiHamburgerMenu />
                    </Text>
                  </Button>
                  {/* Add the 'show' class when the menu is open */}
                  <div className={`dropdown-content ${isMenuOpen ? "show" : ""}`}>
                    <div className="" onClick={() => navigate("/manage")}>
                      {userInfo?.first_name} {userInfo?.last_name}
                    </div>
                    <div className="">{userInfo?.email}</div>
                    <div className="" onClick={logout}>
                      Logout
                    </div>
                    <div className="" onClick={handleDelete}>
                      Delete Account
                    </div>
                  </div>
                </div>

                <CreateUserModal setEmployees={setEmployees} />
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}

Navbar.propTypes = {
  setEmployees: PropTypes.func,
};
