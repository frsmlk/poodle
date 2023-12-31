import { Box, Button, Flex, Image, Stack, Tag, Text } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../assets/icons/check.svg';
import RemoveIcon from '../assets/icons/RemoveIcon';
import CustomInput from '../components/CustomInput';
import { auth, db } from '../firebase';
import useToast from '../hooks/useToast';
import { getAllBreedNames } from '../services/dog.service';
import { TextStyle } from '../theme/types';
import RightIcon from '../assets/icons/RightIcon';

const Breed = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);
  const [user] = useAuthState(auth);
  const [value, loading] = useDocument(doc(db, 'users', user?.uid!!));
  const { errorToast, successToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlBreedNames = async () => {
      const response = await getAllBreedNames();
      if (response.success) {
        setBreeds(response.data!!);
        setFilteredBreeds(response.data!!);
      }
    };

    fetchAlBreedNames();
  }, []);

  useEffect(() => {
    if (!loading && value) {
      const data = value.data();
      setSelectedBreeds(data?.favouriteBreeds || []);
    }
  }, [loading, value]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const result = breeds.filter((breed) =>
      breed.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBreeds(result);
  };

  const handleBreedSelect = (breed: string) => {
    const state = [...selectedBreeds];

    if (state.includes(breed)) {
      const index = state.indexOf(breed);
      state.splice(index, 1);
      setSelectedBreeds(state);
      return;
    }

    if (state.length === 3) {
      errorToast({ description: 'You can only select 3 breeds!' });
      return;
    }

    state.push(breed);
    setSelectedBreeds(state);
  };

  const saveBreeds = async () => {
    try {
      const request = doc(db, 'users', user?.uid!!);
      await updateDoc(request, { favouriteBreeds: selectedBreeds });
      successToast({ description: 'Favourite breeds saved successfully!' });
      navigate('/feed');
    } catch (error) {
      errorToast({
        description: error.message,
      });
    }
  };

  const isButtonDisabled = selectedBreeds.length < 3;

  const breedsDisplay = Array(3)
    .fill(null)
    .map((_, index) => selectedBreeds[index] || 'You have not chosen');

  return (
    <Stack gap={12} align='center'>
      <Stack gap={4} textAlign='center' py={50}>
        <Text textStyle={TextStyle.H1}>Select your favourite breeds</Text>
        <Text textStyle={TextStyle.BodyLarge}>Choose up to 3 breeds</Text>
      </Stack>
      <Flex
        gap={12}
        pb='50px'
        flexDir={['column-reverse', 'column-reverse', 'row']}
        w='100%'
        align={['center', 'center', 'flex-start']}
        justify='center'
      >
        <Stack gap={4} minW={['100%', '100%', '420px']}>
          {filteredBreeds.map((breed: string) => {
            const split = breed.split('-');
            const isSelected = selectedBreeds.includes(breed);
            return (
              <Flex
                key={breed}
                borderWidth={1}
                borderColor='gray.300'
                p={3}
                borderRadius={8}
                onClick={() => handleBreedSelect(breed)}
                bg={isSelected ? 'primary.600' : 'white'}
                align='center'
                justify='space-between'
                cursor='pointer'
                _hover={{
                  transform: 'translateY(-5px)',
                  transitionDuration: '0.2s',
                  transitionTimingFunction: 'ease-in-out',
                }}
              >
                <Flex gap={2}>
                  <Text
                    textTransform='capitalize'
                    textStyle={TextStyle.BodyLarge}
                    fontWeight={isSelected ? 500 : 400}
                  >
                    {split[0]}
                  </Text>
                  {split[1] && (
                    <Tag colorScheme='blue' size='md'>
                      {split[1]}
                    </Tag>
                  )}
                </Flex>
                {isSelected && <Image src={CheckIcon} />}
              </Flex>
            );
          })}
        </Stack>
        <Stack
          gap={4}
          position={['fixed', 'fixed', 'sticky']}
          top={[null, null, '20%']}
          bottom={[0, 0, null]}
          h={[null, null, '100%']}
          w={['100%', '100%', '300px']}
          p={[4, 4, 0]}
          bg={['green.800', 'green.800', 'transparent']}
          borderTopRadius={8}
          borderWidth={[2, 2, 0]}
          borderColor='black'
        >
          <Box display={['none', 'none', 'block']}>
            <CustomInput
              name='search'
              onChange={handleSearch}
              value={searchTerm}
              placeholder='Search breed'
            />
          </Box>

          <Stack
            minW={['100%', '100%', '300px']}
            bg={['transparent', 'transparent', 'white']}
            p={[0, 0, 3]}
            borderWidth={[0, 0, 1]}
            borderColor='gray.300'
            borderRadius='8'
            gap={5}
            boxShadow={['none', 'none', '2px 2px 0px 0px rgba(0, 0, 0, 1)']}
          >
            <Stack>
              {breedsDisplay.map((breed, index) => {
                const split = breed.split('-');
                const isSelected = selectedBreeds.includes(breed);

                return (
                  <Flex justify='space-between' key={index}>
                    <Flex gap={2}>
                      <Text
                        textTransform='capitalize'
                        textStyle={TextStyle.BodyRegular}
                        fontWeight={500}
                        color={
                          isSelected
                            ? 'black'
                            : ['gray.600', 'gray.600', 'gray.400']
                        }
                      >
                        {index + 1}. {split[0]}
                      </Text>
                      {split[1] && (
                        <Tag colorScheme='blue' size='md'>
                          {split[1]}
                        </Tag>
                      )}
                    </Flex>
                    {isSelected && (
                      <Box
                        cursor='pointer'
                        onClick={() => handleBreedSelect(breed)}
                      >
                        <RemoveIcon width={24} height={24} color='#D94F14' />
                      </Box>
                    )}
                  </Flex>
                );
              })}
            </Stack>
            <Stack>
              <Button variant='ghost' onClick={() => setSelectedBreeds([])}>
                Clear selection
              </Button>
              <Button
                isDisabled={isButtonDisabled}
                onClick={saveBreeds}
                rightIcon={
                  !isButtonDisabled ? (
                    <RightIcon width={24} height={24} color='black' />
                  ) : undefined
                }
              >
                {isButtonDisabled
                  ? `Choose ${3 - selectedBreeds.length} more`
                  : 'View feed'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Breed;
