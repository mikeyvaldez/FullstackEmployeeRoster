import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
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
	useToast,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import PropTypes from "prop-types";
import { useState } from "react";

export default function EditModal({ employee, setEmployees }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: employee.name,
		role: employee.role,
		description: employee.description,
	})

	const toast = useToast();

	const handleEditEmployee = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch("/api/employee" + "/" + employee.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs)
			})

			const data = await res.json();
			if(!res.ok){
				throw new Error(data.error)
			}

			setEmployees((prevEmployees) => prevEmployees.map((u) => u.id === employee.id ? data : u))
			toast({
				status: "success",
				title: "Whoopty-doo-basil!",
				description: "Employee updated successfully.",
				duration: 2000,
				position: "top-center",
			  })
			  onClose();
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred",
				description: error.message,
				duration: 4000,
				position: "top-center",
			  })
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleEditEmployee}>
					<ModalContent>
						<ModalHeader>Employee</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>Full Name</FormLabel>
									<Input placeholder='John Doe' value={inputs.name} onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))} />
								</FormControl>

								<FormControl>
									<FormLabel>Role</FormLabel>
									<Input placeholder='Software Engineer' value={inputs.role} onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))} />
								</FormControl>
							</Flex>
							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="He's a software engineer who loves to code and build things."
									value={inputs.description}
									onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
								/>
							</FormControl>
							<RadioGroup defaultValue='male' mt={4}>
								<Flex gap={5}>
									<Radio value='male'>Male</Radio>
									<Radio value='female'>Female</Radio>
								</Flex>
							</RadioGroup>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type="submit" isLoading={isLoading}>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

EditModal.propTypes = {
  employee: PropTypes.object,
  setEmployees: PropTypes.func,
}