import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import StationDetailPage from './pages/StationDetailPage';
import HistoricalPage from './pages/HistoricalPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/station/:id" element={<StationDetailPage />} />
              <Route path="/historical" element={<HistoricalPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
