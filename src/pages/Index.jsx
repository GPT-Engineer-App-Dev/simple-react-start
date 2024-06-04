import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" w="100%" p={4} bg={useColorModeValue("gray.100", "gray.900")} alignItems="center">
        <Box p="2">
          <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        </Box>
        <Spacer />
        <Box>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorModeIcon}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
      <Container centerContent maxW="container.md" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        <Link to="/dishes">
            <Button>Go to Dishes</Button>
          </Link>
        </VStack>
      </Container>
    </Container>
  );
};

export default Index;