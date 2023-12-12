import { Link } from "react-router-dom";
import { FunctionalContentLayout } from "./FunctionalContentLayout";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { useState, useEffect } from "react";
import { Dog, SelectorToggle } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export const FunctionalSection = () => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelectorActive, setIsSelectorActive] = useState<SelectorToggle>([
    false,
    false,
    false,
  ]);

  const refetchDogData = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  useEffect(() => {
    refetchDogData();
  }, []);

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(refetchDogData)
      .then(() => {
        toast.success(`Created ${dog.name}`);
      })
      .finally(() => setIsLoading(false));
  };

  const toggleActiveClassName = (index: number) =>
    isSelectorActive[index] ? "active" : "";

  const setActiveSelector = (index: number) => {
    const newState = isSelectorActive.map((activeState, activeStateIndex) => {
      const newActiveState = activeState === true ? false : true;
      return activeStateIndex === index ? newActiveState : false;
    }) as unknown as SelectorToggle;
    setIsSelectorActive(newState);
  };

  const shouldShowFavoriteDogs = isSelectorActive[0];
  const shouldShowUnfavoritedDogs = isSelectorActive[1];
  const shouldShowForm = isSelectorActive[2];

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
          <div
            className={`selector ${toggleActiveClassName(0)}`}
            onClick={() => setActiveSelector(0)}
          >
            favorited ( {favoritedDogs.length} )
          </div>
          <div
            className={`selector ${toggleActiveClassName(1)}`}
            onClick={() => setActiveSelector(1)}
          >
            unfavorited ( {unfavoritedDogs.length} )
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
          <FunctionalCreateDogForm postDog={postDog} isLoading={isLoading} />
        ) : (
          <FunctionalDogs
            dogs={dogArray}
            refetchDogData={refetchDogData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalContentLayout>
    </section>
  );
};
