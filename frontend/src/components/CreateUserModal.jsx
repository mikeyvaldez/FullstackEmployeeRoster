import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";

const CreateUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Employees</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Flex alignItems={"center"} gap={4}>
              {/* Left */}
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder="John Doe"
                value={inputs.name}
                onChange={(e) => setInputs({...inputs, name: e.target.value})}
                />
              </FormControl>

              {/* Right */}
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input
                  placeholder="Software Engineer"
                  value={inputs.role}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </FormControl>
            </Flex>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                resize={"none"}
                overflowY={"hidden"}
                placeholder="He's a software engineer who loves to code and build things."
                value={inputs.description}
                  onChange={(e) => setInputs({...inputs, name: e.target.value})}
              />
            </FormControl>

            <RadioGroup mt={4}>
              <Flex gap={5}>
                <Radio
                value={inputs.name}
                onChange={(e) => setInputs({...inputs, name: e.target.value})}
                >Male</Radio>
                <Radio
                value={inputs.name}
                  onChange={(e) => setInputs({...inputs, name: e.target.value})}
                >Female</Radio>
              </Flex>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateUserModal;
