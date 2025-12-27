import { Container, Heading, Text } from '@chakra-ui/react'

export default function HistoricalPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={4}>
        Historical Comparison
      </Heading>
      <Text color="gray.600">
        Historical analysis and station comparison tools will be displayed here.
      </Text>
    </Container>
  )
}
