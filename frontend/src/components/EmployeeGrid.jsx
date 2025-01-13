import { Grid } from "@chakra-ui/react";
import { EMPLOYEES } from "../sampleUsers/demoUsers.js";
import EmployeeCard from "./EmployeeCard.jsx";

export default function EmployeeGrid() {
  return (
    <Grid templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
    }}
    gap={4}
    >
        {EMPLOYEES.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
        ))}
    </Grid>
  )
}
