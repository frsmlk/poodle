import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { TextStyle } from '../theme/types';
import { useState } from 'react';
import EyeIcon from '../assets/icons/eye.svg';
import EyeOffIcon from '../assets/icons/eye-off.svg';

const CustomInput = ({ ...props }: InputProps) => {
  const [show, setShow] = useState(false);

  return (
    <Box pos='relative'>
      <FormControl isRequired colorScheme='primary'>
        <InputGroup>
          <Input
            bg='white'
            size='lg'
            variant='unstyled'
            p='16px'
            borderWidth='1px'
            borderColor='gray.300'
            boxSizing='border-box'
            _hover={{ borderColor: 'primary.400' }}
            _focus={{
              borderColor: 'primary.600',
              shadow: 'null',
              borderWidth: '1.5px',
              outline: 'none',
            }}
            {...props}
            type={show ? 'text' : 'password'}
          />
          {props.name === 'password' && (
            <InputRightElement mt='9px' mr='10px'>
              <Image
                onClick={() => setShow(!show)}
                cursor='pointer'
                src={show ? EyeIcon : EyeOffIcon}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <Text
        textStyle={TextStyle.LabelInput}
        top='0%'
        transform='translate(15px,-40%) scale(0.8)'
        p='0 4px'
        bg='blue.50'
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
