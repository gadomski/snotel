import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Box flex={1} overflow="hidden">
        {children}
      </Box>
    </Flex>
  );
}
