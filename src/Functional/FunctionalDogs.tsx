import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { useEffect, useState } from "react";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({ dogs }: { dogs: Dog[] }) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogs.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              alert("clicked trash");
            }}
            onHeartClick={() => {
              alert("clicked heart");
            }}
            onEmptyHeartClick={() => {
              alert("clicked empty heart");
            }}
            isLoading={false}
          />
        );
      })}
    </>
  );
};
