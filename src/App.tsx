import { Box, Stack, Text } from '@chakra-ui/react';
import { TextStyle } from './theme/types';
import CustomInput from './components/CustomInput';

function App() {
  return (
    <Stack gap={5}>
      <Text textStyle={TextStyle.H4}>
        Almost before we knew it, we had left the ground
      </Text>
      <Text textStyle={TextStyle.BodyLarge}>
        Almost before we knew it, we had left the ground
      </Text>
      <Box w='500px' p={5}>
        <CustomInput name='email' placeholder='youremail@address.com' />
      </Box>
    </Stack>
  );
}

export default App;
