import { Box, Grid, GridItem } from '@chakra-ui/react';
import SnotelMap from '@/components/map/SnotelMap';

export default function HomePage() {
  return (
    <Box h="full">
      <Grid templateColumns="1fr" h="full">
        <GridItem>
          <SnotelMap />
        </GridItem>
      </Grid>
    </Box>
  );
}
