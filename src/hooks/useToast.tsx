import {
  Box,
  Flex,
  Image,
  Text,
  useToast as useToastUI,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import CheckIcon from '../assets/icons/check.svg';
import RemoveIcon from '../assets/icons/remove.svg';
import { TextStyle } from '../theme/types';

interface InputToast {
  title?: string;
  description?: string;
  duration?: number;
  id?: string;
}

const useToast = () => {
  const toast = useToastUI();

  const successToast = useCallback(
    ({ title, description, duration = 5000, id }: InputToast) => {
      toast({
        title: title || 'Success',
        description: description,
        position: 'bottom',
        status: 'success',
        duration: duration,
        isClosable: true,
        id,
        render: () => (
          <Flex
            gap={2}
            color='black'
            p={3}
            bg='green.800'
            align='center'
            rounded={8}
            border='1px solid black'
          >
            <Image bg='green.800' src={CheckIcon} />
            <Text
              bg='green.800'
              fontWeight={500}
              textStyle={TextStyle.BodyRegular}
            >
              {description}
            </Text>
          </Flex>
        ),
      });
    },
    [toast]
  );

  const errorToast = useCallback(
    ({ title, description, duration = 5000, id }: InputToast) => {
      toast({
        title: title || 'Ops!',
        description: description,
        position: 'bottom',
        status: 'error',
        duration: duration,
        isClosable: true,
        id,
        render: () => (
          <Flex
            gap={2}
            color='black'
            p={3}
            bg='primary.800'
            align='center'
            rounded={8}
            border='1px solid black'
          >
            <Image bg='primary.800' src={RemoveIcon} />
            <Text
              bg='primary.800'
              fontWeight={500}
              textStyle={TextStyle.BodyRegular}
            >
              {description}
            </Text>
          </Flex>
        ),
      });
    },
    [toast]
  );

  return { successToast, errorToast };
};

export default useToast;
