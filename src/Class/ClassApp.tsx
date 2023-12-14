import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ActiveComponent, Dog } from "../types";
import { Requests } from "../api";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassDogs } from "./ClassDogs";
import toast from "react-hot-toast";

type ClassAppState = {
  allDogs: Dog[];
  isLoading: boolean;
  activeComponent: ActiveComponent;
};

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    isLoading: false,
    activeComponent: "all",
  };

  refetchDogData = () => {
    return Requests.getAllDogs().then((allDogs) =>
      this.setState({ allDogs: allDogs })
    );
  };

  componentDidMount(): void {
    this.refetchDogData().catch(() => {
      throw new Error("Unable to fetch data");
    });
  }

  postDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(this.refetchDogData)
      .then(() => {
        toast.success(`Created ${dog.name}`);
      })
      .catch(() => {
        toast.error(`Unable to create ${dog.name}`);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  deleteDog = (dog: Dog) => {
    this.setState({ isLoading: true });
    return Requests.deleteDog(dog)
      .then(this.refetchDogData)
      .catch(() => {
        toast.error(`Unable to delete ${dog.name}`);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  updateDog = (dog: Dog, isFavorite: boolean) => {
    this.setState({ isLoading: true });
    return Requests.updateDog(dog, isFavorite)
      .then(this.refetchDogData)
      .catch(() => {
        toast.error(
          `Unable to ${isFavorite ? "favorite" : "unfavorite"} ${dog.name}`
        );
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  determineActiveComponent = (component: ActiveComponent) => {
    if (component === this.state.activeComponent) {
      this.setState({ activeComponent: "all" });
    } else {
      this.setState({ activeComponent: component });
    }
  };

  render() {
    const shouldShowForm = this.state.activeComponent === "create-dog-form";
    const favoritedDogs = this.state.allDogs.filter(
      (dog) => dog.isFavorite === true
    );
    const unfavoritedDogs = this.state.allDogs.filter(
      (dog) => dog.isFavorite === false
    );

    const determineDogArray = (): Dog[] => {
      switch (this.state.activeComponent) {
        case "all":
          return this.state.allDogs;
        case "favorited":
          return favoritedDogs;
        case "unfavorited":
          return unfavoritedDogs;
        case "create-dog-form":
          return [];
      }
    };

    const dogArray = determineDogArray();

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeComponent={this.state.activeComponent}
          determineActiveComponent={this.determineActiveComponent}
          favoritedDogsCount={favoritedDogs.length}
          unfavoritedDogsCount={unfavoritedDogs.length}
        >
          {shouldShowForm ? (
            <ClassCreateDogForm
              postDog={this.postDog}
              isLoading={this.state.isLoading}
            />
          ) : (
            <ClassDogs
              dogs={dogArray}
              deleteDog={this.deleteDog}
              updateDog={this.updateDog}
              isLoading={this.state.isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
