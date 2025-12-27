import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { useUIStore } from '@/store/useUIStore'
import { APP_NAME } from '@/utils/constants'

export default function Header() {
  const { toggleSidebar } = useUIStore()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Flex align="center" justify="space-between">
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle sidebar"
            icon={<FiMenu />}
            onClick={toggleSidebar}
            display={{ base: 'flex', md: 'none' }}
            variant="ghost"
          />
          <Heading size="md" as={RouterLink} to="/">
            {APP_NAME}
          </Heading>
        </HStack>

        <HStack spacing={4}>
          <Button as={RouterLink} to="/" variant="ghost" size="sm">
            Map
          </Button>
          <Button as={RouterLink} to="/historical" variant="ghost" size="sm">
            Historical
          </Button>
          <Button as={RouterLink} to="/about" variant="ghost" size="sm">
            About
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}
