import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import EmployeeCard from "./EmployeeCard.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../context/userContext.jsx";
import { getTokenFromCookie } from "../utils/auth.js";

const vite_api_url = import.meta.env.VITE_API_URL

export default function EmployeeGrid({ employees, setEmployees }) {
  const [isLoading, setIsLoading] = useState(true);
  // const { userInfo } = useUserContext();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        // Retrieve the token from localStorage
        const token = getTokenFromCookie();
        // console.log(token)

        
        const res = await fetch(`${vite_api_url}/api/employee/get_employees`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch employees.");
        }
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getEmployees();
  }, [setEmployees]);

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            setEmployees={setEmployees}
          />
        ))}
      </Grid>
      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!isLoading && employees.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              You have no Employees
            </Text>                        
          </Text>
        </Flex>
      )}
    </>
  );
}
EmployeeGrid.propTypes = {
  employees: PropTypes.array,
  setEmployees: PropTypes.func,
};