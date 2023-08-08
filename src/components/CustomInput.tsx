import {
  Box,
  Text,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { TextStyle } from '../theme/types';
import { useState } from 'react';
import EyeIcon from '../assets/icons/eye.svg';
import EyeOffIcon from '../assets/icons/eye-off.svg';

interface ICustomInputProps {
  isError?: boolean;
  helperText?: string;
  errorText?: string;
  name?: string;
  type?: string;
  [prop: string]: any;
}

const TogglePasswordIcon = ({
  show,
  toggle,
}: {
  show: boolean;
  toggle: () => void;
}) => (
  <InputRightElement mt='9px' mr='10px'>
    <Image
      onClick={toggle}
      cursor='pointer'
      src={show ? EyeIcon : EyeOffIcon}
    />
  </InputRightElement>
);

const CustomInput = (props: ICustomInputProps) => {
  const { isError, helperText, errorText, name, type, ...otherProps } = props;

  const [show, setShow] = useState(false);

  const handleToggle = () => setShow((prevShow) => !prevShow);

  const isPasswordField = name === 'password';
  const inputType = isPasswordField ? (show ? 'text' : 'password') : type;

  return (
    <Box pos='relative'>
      <FormControl isInvalid={isError} isRequired colorScheme='primary'>
        <InputGroup>
          <Input
            bg='white'
            size='lg'
            variant='unstyled'
            p='16px'
            borderWidth='1px'
            borderColor='gray.300'
            _hover={{ borderColor: 'primary.400' }}
            _focus={{ borderColor: 'primary.600', borderWidth: '1.5px' }}
            _invalid={{ borderColor: '#D94F14' }}
            type={inputType}
            {...otherProps}
          />
          {isPasswordField && (
            <TogglePasswordIcon show={show} toggle={handleToggle} />
          )}
        </InputGroup>
        {isError ? (
          <FormErrorMessage
            textStyle={TextStyle.BodySmall}
            p={2}
            color='#D94F14'
          >
            {errorText}
          </FormErrorMessage>
        ) : (
          helperText && (
            <FormHelperText
              textStyle={TextStyle.BodySmall}
              p={2}
              color='rgb(0,0,0,0.3)'
            >
              {helperText}
            </FormHelperText>
          )
        )}
      </FormControl>
      <Text
        textStyle={TextStyle.LabelInput}
        top='0%'
        transform='translate(15px,-40%) scale(0.8)'
        p='0 4px'
        bg='blue.50'
        transition='all .2s ease-out'
        pos='absolute'
        w='fit-content'
        h='fit-content'
        zIndex='5'
        textTransform='capitalize'
      >
        {name}
      </Text>
    </Box>
  );
};

export default CustomInput;
