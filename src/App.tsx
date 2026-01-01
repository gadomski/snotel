import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import Map from './components/Map';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Map></Map>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
