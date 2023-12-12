import { Component } from "react";
import { Link } from "react-router-dom";
import { Dog, SelectorToggle } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { ClassContentLayout } from "./ClassContentLayout";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassDogs } from "./ClassDogs";

type ClassSectionState = {
  allDogs: Dog[];
  isLoading: boolean;
  isSelectorActive: SelectorToggle;
};

export class ClassSection extends Component<
  Record<string, never>,
  ClassSectionState
> {
  state: ClassSectionState = {
    allDogs: [],
    isLoading: false,
    isSelectorActive: [false, false, false],
  };

  componentDidMount(): void {
    this.refetchDogData();
  }

  refetchDogData = () => {
    return Requests.getAllDogs().then((allDogs) =>
      this.setState({ allDogs: allDogs })
    );
  };

  postDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(this.refetchDogData)
      .then(() => {
        toast.success(`Created ${dog.name}`);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleActiveClassName = (index: number) => {
    return this.state.isSelectorActive[index] ? "active" : "";
  };

  setActiveSelector = (index: number) => {
    const newState = this.state.isSelectorActive.map(
      (activeState, activeStateIndex) => {
        const newActiveState = activeState === true ? false : true;
        return activeStateIndex === index ? newActiveState : false;
      }
    ) as unknown as SelectorToggle;
    this.setState({ isSelectorActive: newState });
  };

  render() {
    const { allDogs, isLoading, isSelectorActive } = this.state;
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

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            <div
              className={`selector ${this.toggleActiveClassName(0)}`}
              onClick={() => {
                this.setActiveSelector(0);
              }}
            >
              favorited ( {favoritedDogs.length} )
            </div>
            <div
              className={`selector ${this.toggleActiveClassName(1)}`}
              onClick={() => {
                this.setActiveSelector(1);
              }}
            >
              unfavorited ( {unfavoritedDogs.length} )
            </div>
            <div
              className={`selector ${this.toggleActiveClassName(2)}`}
              onClick={() => {
                this.setActiveSelector(2);
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <ClassContentLayout>
          {shouldShowForm ? (
            <ClassCreateDogForm postDog={this.postDog} isLoading={isLoading} />
          ) : (
            <ClassDogs
              dogs={dogArray}
              refetchDogData={this.refetchDogData}
              isLoading={isLoading}
              setIsLoading={(isLoading) => {
                this.setState({ isLoading: isLoading });
              }}
            />
          )}
        </ClassContentLayout>
      </section>
    );
  }
}
