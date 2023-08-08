import { Stack, Text, Box, Flex, Image, Tag, Button } from '@chakra-ui/react';
import { TextStyle } from '../theme/types';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { getRandomImagesOfUsersFavouriteBreeds } from '../services/dog.service';
import { useEffect, useState } from 'react';
import HeartIcon from '../assets/icons/HeartIcon';
import useToast from '../hooks/useToast';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type TRandomImage = {
  breed: string;
  image: string;
};

const Feed = () => {
  const [user] = useAuthState(auth);
  const [userData, userLoading] = useDocument(doc(db, 'users', user?.uid!!));
  const [randomImages, setRandomImages] = useState<TRandomImage[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const { errorToast, successToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedImages = async () => {
      const q = query(
        collection(db, 'likes'),
        where('userId', '==', user?.uid)
      );
      const response = await getDocs(q);
      const output: string[] = response.docs.map((doc) => doc.data().imageUrl);

      setLikedImages(output);
    };

    fetchLikedImages();
  }, []);

  useEffect(() => {
    if (userLoading) return;
    const fetchRandomImages = async () => {
      const favouriteBreeds = userData?.data()?.favouriteBreeds || [];
      const response = await getRandomImagesOfUsersFavouriteBreeds(
        favouriteBreeds
      );

      if (response.success) {
        setRandomImages(response.data!!);
      }
    };

    fetchRandomImages();
  }, [userLoading, userData]);

  const handleLike = async (breed: string, imageUrl: string) => {
    try {
      setLikedImages([...likedImages, imageUrl]);
      successToast({
        description: 'Image liked!',
      });
      await addDoc(collection(db, 'likes'), {
        userId: user?.uid,
        breed,
        imageUrl,
      });
    } catch (error) {
      errorToast({
        description: error.message,
      });
    }
  };

  return (
    <Stack gap={12} align='center'>
      <Stack p={50} gap={8} align='center'>
        <Text textStyle={TextStyle.H1}>Your favourite breeds</Text>
        <Flex gap={2} align='center'>
          {randomImages.map((breed) => {
            const split = breed.breed.split('-');
            return (
              <Tag textTransform='capitalize' size='lg' colorScheme='blue'>
                {split[0]} {split[1] && `(${split[1]})`}
              </Tag>
            );
          })}
        </Flex>
      </Stack>
      <Flex gap={8} wrap='wrap'>
        {randomImages.map((breed) => {
          const split = breed.breed.split('-');
          const isLiked = likedImages.includes(breed.image);
          return (
            <Stack
              boxSizing='border-box'
              key={breed.breed}
              boxShadow='2px 2px 0px 0px rgba(0, 0, 0, 1)'
              rounded={8}
              overflow='hidden'
              borderWidth={1}
              gap={0}
            >
              <Image w='300px' h='250px' objectFit='cover' src={breed.image} />
              <Flex p={3} bg='green.600' justify='space-between' align='center'>
                <Stack>
                  <Text textStyle={TextStyle.H3} textTransform='capitalize'>
                    {split[0]} {split[1] && `(${split[1]})`}
                  </Text>
                </Stack>
                <Box
                  cursor='pointer'
                  onClick={() => handleLike(breed.breed, breed.image)}
                >
                  <HeartIcon
                    width={24}
                    height={24}
                    color={isLiked ? '#D94F14' : 'black'}
                  />
                </Box>
              </Flex>
            </Stack>
          );
        })}
      </Flex>
      <Stack gap={4}>
        <Button variant='ghost' onClick={() => navigate('/breed')}>
          Change Favourite Breeds
        </Button>
        <Button
          onClick={() => {
            signOut(auth);
            successToast({
              description: 'You have successfully signed out!',
            });
          }}
        >
          Sign out
        </Button>
      </Stack>
    </Stack>
  );
};

export default Feed;
