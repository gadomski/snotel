import { AbsoluteCenter, Center, Spinner, Stack, Text } from '@chakra-ui/react';

interface LoadingOverlayProps {
  text: string;
}

export default function LoadingOverlay({ text }: LoadingOverlayProps) {
  return (
    <AbsoluteCenter
      backgroundColor="rgba(0, 0, 0, 0.5)"
      width={'100%'}
      height={'100%'}
    >
      <Stack gap={4}>
        <Center>
          <Spinner size="xl" color="white" borderWidth="4px" />
        </Center>
        <Text color="white" fontSize="lg" fontWeight="medium">
          {text}
        </Text>
      </Stack>
    </AbsoluteCenter>
  );
}
