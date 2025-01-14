import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import EmployeeCard from "./EmployeeCard.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function EmployeeGrid({ employees, setEmployees }) {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    console.log(typeof(setEmployees))
    const getEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees")
        const data = await res.json();
        
        if(!res.ok){
          throw new Error(data.error);
        }
        setEmployees(data)
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getEmployees()
  }, [setEmployees])

  return (
    <>    
      <Grid templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
      }}
      gap={4}
      >
          {employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
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
              Awwww!...... Poor you...
            </Text>
          </Text>
        </Flex>
      )}
    </>
  )
}

EmployeeGrid.propTypes = {
  employees: PropTypes.array,
  setEmployees: PropTypes.func,
}
