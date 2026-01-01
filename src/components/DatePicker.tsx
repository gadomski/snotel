import { Box, Input } from '@chakra-ui/react';

import { useStore } from '@/store/useStore';
import { formatDate } from '@/utils/dateHelpers';

export default function DatePicker() {
  const date = useStore((state) => state.date);
  const setDate = useStore((state) => state.setDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    }
  };

  return (
    <Box
      position="absolute"
      top="4"
      left="4"
      zIndex="1000"
      backgroundColor="white"
      padding="2"
      borderRadius="md"
      boxShadow="md"
    >
      <Input
        type="date"
        value={formatDate(date)}
        onChange={handleDateChange}
        size="sm"
      />
    </Box>
  );
}
