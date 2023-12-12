import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type ClassDogProps = {
  dogs: Dog[];
  refetchDogData: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export class ClassDogs extends Component<ClassDogProps> {
  deleteDog = (dog: Dog) => {
    this.props.setIsLoading(true);
    return Requests.deleteDog(dog)
      .then(this.props.refetchDogData)
      .finally(() => this.props.setIsLoading(false));
  };

  updateDog = (dog: Dog, isFavorite: boolean) => {
    this.props.setIsLoading(true);
    return Requests.updateDog(dog, isFavorite)
      .then(this.props.refetchDogData)
      .finally(() => this.props.setIsLoading(false));
  };

  render() {
    const { dogs, isLoading } = this.props;
    return (
      <>
        {dogs.map((dog) => {
          return (
            <DogCard
              dog={dog}
              key={dog.id}
              onTrashIconClick={() => {
                this.deleteDog(dog);
              }}
              onHeartClick={() => {
                this.updateDog(dog, false);
              }}
              onEmptyHeartClick={() => {
                this.updateDog(dog, true);
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
