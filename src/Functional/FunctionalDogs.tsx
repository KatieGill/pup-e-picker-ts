import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const FunctionalDogs = ({
  dogs,
  deleteDog,
  updateDog,
  isLoading,
}: {
  dogs: Dog[];
  deleteDog: (dog: Dog) => Promise<void>;
  updateDog: (dog: Dog, isFavorite: boolean) => Promise<void>;
  isLoading: boolean;
}) => {
  return (
    <>
      {dogs.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog).catch((error: Error) => error.message);
            }}
            onHeartClick={() => {
              updateDog(dog, false).catch((error: Error) => error.message);
            }}
            onEmptyHeartClick={() => {
              updateDog(dog, true).catch((error: Error) => error.message);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
