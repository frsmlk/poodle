import { Button, Flex, Image, Stack, Tag, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllBreedNames } from '../services/dog.service';
import { TextStyle } from '../theme/types';
import CheckIcon from '../assets/icons/check.svg';
import RemoveIcon from '../assets/icons/remove.svg';
import CustomInput from '../components/CustomInput';

const Breed = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);

  useEffect(() => {
    const request = async () => {
      const response = await getAllBreedNames();
      if (response.success) setBreeds(response.data!!);
    };

    request();
  }, []);

  const handleSearch = (e) => {
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

    if (state.length === 3) return;

    state.push(breed);
    setSelectedBreeds(state);
  };

  const isButtonDisabled = selectedBreeds.length < 3;

  const breedsDisplay = Array(3)
    .fill(null)
    .map((_, index) => selectedBreeds[index] || 'You have not chosen');

  return (
    <Stack gap={12} align='center'>
      <Stack gap={4} textAlign='center'>
        <Text textStyle={TextStyle.H1}>Select your favourite breeds</Text>
        <Text textStyle={TextStyle.BodyLarge}>Choose up to 3 breeds</Text>
      </Stack>
      <Flex gap={12} pb='50px'>
        <Stack gap={4} minW='420px'>
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
                bg={isSelected ? 'primary.400' : 'white'}
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
        <Stack gap={4} position='sticky' top='20%' h='100%'>
          <CustomInput
            name='search'
            onChange={handleSearch}
            value={searchTerm}
            placeholder='Search breed'
          />
          <Stack
            minW='300px'
            p={3}
            borderWidth={1}
            borderColor='gray.300'
            borderRadius='8'
            gap={5}
            boxShadow='2px 2px 0px 0px rgba(0, 0, 0, 1)'
          >
            <Stack>
              {breedsDisplay.map((breed, index) => {
                const split = breed.split('-');
                const isSelected = selectedBreeds.includes(breed);

                return (
                  <Flex justify='space-between'>
                    <Flex gap={2}>
                      <Text
                        textTransform='capitalize'
                        textStyle={TextStyle.BodyRegular}
                        fontWeight={500}
                        color={isSelected ? 'black' : 'gray.400'}
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
                      <Image
                        src={RemoveIcon}
                        cursor='pointer'
                        onClick={() => handleBreedSelect(breed)}
                      />
                    )}
                  </Flex>
                );
              })}
            </Stack>
            <Stack>
              <Button variant='ghost' onClick={() => setSelectedBreeds([])}>
                Clear selection
              </Button>
              <Button isDisabled={isButtonDisabled}>
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
