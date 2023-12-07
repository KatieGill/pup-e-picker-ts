// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { FunctionalContentLayout } from "./FunctionalContentLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { useState, useEffect } from "react";
import { Dog } from "../types";

type SelectorToggle = [boolean, boolean, boolean];
const getAllDogs = () =>
  fetch("http://localhost:3000/dogs").then((response) => response.json());

export const FunctionalSection = () => {
  const [isSelectorActive, setIsSelectorActive] = useState<SelectorToggle>([
    false,
    false,
    false,
  ]);

  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  useEffect(() => {
    getAllDogs().then(setAllDogs);
  }, []);

  const toggleActiveClassName = (index: number) =>
    isSelectorActive[index] ? "active" : "";

  const setActiveSelector = (index: number) => {
    const newState = isSelectorActive.map((activeState, activeStateIndex) => {
      const newActiveState = activeState === true ? false : true;
      return activeStateIndex === index ? newActiveState : false;
    }) as unknown as SelectorToggle;
    setIsSelectorActive(newState);
  };

  const shouldShowForm = isSelectorActive[2];
  const shouldShowFavoriteDogs = isSelectorActive[0];
  const shouldShowUnfavoritedDogs = isSelectorActive[1];

  const favoritedDogs = allDogs.filter(
    (dog) => dog.isFavorite === true
  ) as unknown as Dog[];
  const unfavoritedDogs = allDogs.filter(
    (dog) => dog.isFavorite === false
  ) as unknown as Dog[];

  const determineDogArray = () => {
    if (shouldShowFavoriteDogs) {
      return favoritedDogs;
    } else if (shouldShowUnfavoritedDogs) {
      return unfavoritedDogs;
    } else {
      return allDogs;
    }
  };

  const dogArray = determineDogArray();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${toggleActiveClassName(0)}`}
            onClick={() => setActiveSelector(0)}
          >
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${toggleActiveClassName(1)}`}
            onClick={() => setActiveSelector(1)}
          >
            unfavorited ( 25 )
          </div>
          <div
            className={`selector ${toggleActiveClassName(2)}`}
            onClick={() => setActiveSelector(2)}
          >
            create dog
          </div>
        </div>
      </div>

      <FunctionalContentLayout>
        {shouldShowForm ? (
          <FunctionalCreateDogForm />
        ) : (
          <FunctionalDogs dogs={dogArray} />
        )}
      </FunctionalContentLayout>
    </section>
  );
};
