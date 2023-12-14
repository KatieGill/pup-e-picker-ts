import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

type ClassDogProps = {
  dogs: Dog[];
  deleteDog: (dog: Dog) => Promise<void | Dog[]>;
  updateDog: (dog: Dog, isFavorite: boolean) => Promise<void | Dog[]>;
  isLoading: boolean;
};

export class ClassDogs extends Component<ClassDogProps> {
  render() {
    const { dogs, deleteDog, updateDog, isLoading } = this.props;
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
  }
}
