import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/userContext.jsx"; // Import useUserContext


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { login } = useUserContext(); // Access login function from context
  const navigate = useNavigate();

  const handleShow = () => setShow(!show);

  const handleSubmit = async () => {    
    if (!email || !password) {
      toast({
        title: "Please Fill in all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }


    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })

      const data = await response.json();
      
      login(data)
      setLoading(false);
      navigate("/manage")            
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false); // Re-enable button after submission
    }
  };

  return (
    <VStack spacing="5px">
      
      <FormControl id="signupEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="signupPassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" onClick={handleShow}>
            <Button height="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading} // Disable button while loading
      >
        Login
      </Button>
    </VStack>
  );
}
