import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import EditModal from "./EditModal";

const vite_api_url = import.meta.env.VITE_API_URL

export default function EmployeeCard({ employee, setEmployees }) {
  const toast = useToast();
  
  const handleDeleteEmployee = async () => {
    try {
      const res = await fetch(`${vite_api_url}/api/employee` + "/" + employee.id, {
        method: "DELETE",
      })
      
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.error)
      }

      setEmployees((prevEmployees) => prevEmployees.filter((u) => u.id !== employee.id))
      toast({
        status: "success",
        title: "Success",
        description: "Employee deleted successfully.",
        duration: 2000,
        position: "top-center",
      })

    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <Flex>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={employee.imgUrl} />

            <Box>
              <Heading size="sm">{employee.name}</Heading>
              <Text>{employee.role}</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal employee={employee} setEmployees={setEmployees} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteEmployee}
            />
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Text>
            {employee.description}
        </Text>
      </CardBody>
    </Card>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.object,
  setEmployees: PropTypes.func,
}