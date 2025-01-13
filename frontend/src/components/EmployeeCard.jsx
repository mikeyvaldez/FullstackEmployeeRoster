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
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import EditModal from "./EditModal";

export default function EmployeeCard({ employee }) {
  return (
    <Card>
      <CardHeader>
        <Flex>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src="https://avatar.iran.liara.run/public" />

            <Box>
              <Heading size="sm">{employee.name}</Heading>
              <Text>{employee.role}</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal employee={employee} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
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
}