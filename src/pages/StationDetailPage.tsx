import { Container, Heading, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export default function StationDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={4}>
        Station Detail
      </Heading>
      <Text>Station ID: {id}</Text>
      <Text color="gray.600" mt={4}>
        Station details and charts will be displayed here.
      </Text>
    </Container>
  )
}
