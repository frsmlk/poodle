import { Text } from '@chakra-ui/react';
import { TextStyle } from './theme/types';

function App() {
  return (
    <div>
      <Text textStyle={TextStyle.H4}>
        Almost before we knew it, we had left the ground
      </Text>
      <Text textStyle={TextStyle.BodyLarge}>
        Almost before we knew it, we had left the ground
      </Text>
    </div>
  );
}

export default App;
