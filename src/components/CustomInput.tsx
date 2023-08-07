import {
  FormControl,
  InputGroup,
  Input,
  Box,
  Text,
  InputProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TextStyle } from '../theme/types';

const CustomInput = ({ ...props }: InputProps) => {
  const [value, setValue] = useState('');

  return (
    <Box pos='relative'>
      <FormControl isRequired colorScheme='primary'>
        <InputGroup>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={props.placeholder}
            size='lg'
            variant='unstyled'
            p='16px'
            borderWidth='1px'
            borderColor='gray.300'
            _hover={{ borderColor: 'primary.400' }}
            _focus={{
              borderColor: 'primary.600',
              shadow: 'null',
              borderWidth: '1.5px',
            }}
          />
        </InputGroup>
      </FormControl>
      <Text
        textStyle={TextStyle.LabelInput}
        top='0%'
        transform='translate(15px,-40%) scale(0.8)'
        p='0 4px'
        bg='#fff'
        transformOrigin='top left'
        transition='all .2s ease-out'
        color='black'
        pointerEvents='none'
        pos='absolute'
        w='fit-content'
        h='fit-content'
        zIndex='5'
        textTransform='capitalize'
      >
        {props.name}
      </Text>
    </Box>
  );
};

export default CustomInput;
