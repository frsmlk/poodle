export const getAllBreedNames = async () => {
  try {
    const request = await fetch('https://dog.ceo/api/breeds/list/all');
    const response = await request.json();

    let flattened: string[] = [];

    Object.keys(response.message).forEach((breed) => {
      if (response.message[breed].length === 0) {
        flattened.push(breed);
      } else {
        response.message[breed].forEach((subBreed: string) => {
          flattened.push(`${breed}-${subBreed}`);
        });
      }
    });

    return {
      success: true,
      data: flattened,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getRandomImagesOfUsersFavouriteBreeds = async (
  breeds: string[]
) => {
  try {
    const requests = await Promise.all(
      breeds.map(async (breed) => {
        const split = breed.split('-');
        let endpoint = `https://dog.ceo/api/breed/${split[0]}${
          split[1] ? `/${split[1]}` : ''
        }/images/random`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return {
          breed,
          image: data.message,
        };
      })
    );

    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
