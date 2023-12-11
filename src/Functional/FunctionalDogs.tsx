import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  dogs,
  refetchDogData,
  isLoading,
  setIsLoading,
}: {
  dogs: Dog[];
  refetchDogData: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const deleteDog = (dog: Dog) => {
    setIsLoading(true);
    return Requests.deleteDog(dog)
      .then(refetchDogData)
      .finally(() => setIsLoading(false));
  };
  const updateDog = (dog: Dog, isFavorite: boolean) => {
    setIsLoading(true);
    return Requests.updateDog(dog, isFavorite)
      .then(refetchDogData)
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {dogs.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog);
            }}
            onHeartClick={() => {
              updateDog(dog, false);
            }}
            onEmptyHeartClick={() => {
              updateDog(dog, true);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
