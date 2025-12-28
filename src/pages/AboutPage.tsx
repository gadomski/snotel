import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg" mb={4}>
            About SNOTEL
          </Heading>
          <Text>
            SNOTEL (SNOw TELemetry) is an automated data collection network of
            snowpack and climate sensors operated by the USDA Natural Resources
            Conservation Service (NRCS).
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={3}>
            Features
          </Heading>
          <List spacing={2}>
            <ListItem>
              <ListIcon as={FiExternalLink} color="blue.500" />
              Interactive map with 800+ SNOTEL stations
            </ListItem>
            <ListItem>
              <ListIcon as={FiExternalLink} color="blue.500" />
              Real-time snow depth, SWE, temperature, and precipitation data
            </ListItem>
            <ListItem>
              <ListIcon as={FiExternalLink} color="blue.500" />
              Historical data analysis and comparison
            </ListItem>
            <ListItem>
              <ListIcon as={FiExternalLink} color="blue.500" />
              Water year-based reporting (October 1 - September 30)
            </ListItem>
          </List>
        </Box>

        <Box>
          <Heading size="md" mb={3}>
            Data Source
          </Heading>
          <Text mb={2}>
            Data is provided by the NRCS Air and Water Database (AWDB) REST API.
          </Text>
          <Link
            href="https://wcc.sc.egov.usda.gov/awdbRestApi/swagger-ui/index.html"
            isExternal
            color="blue.500"
          >
            AWDB REST API Documentation{' '}
            <FiExternalLink style={{ display: 'inline' }} />
          </Link>
        </Box>

        <Box>
          <Heading size="md" mb={3}>
            Technology
          </Heading>
          <Text>
            Built with React, TypeScript, Chakra UI, MapLibre GL JS, and React
            Query.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
