import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

type ClassCreateDogFormProps = {
  postDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
};

type ClassCreateDogFormState = {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
};

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state: ClassCreateDogFormState = {
    nameInput: "",
    descriptionInput: "",
    imageInput: defaultSelectedImage,
  };

  resetState = () => {
    this.setState({ nameInput: "" });
    this.setState({ descriptionInput: "" });
    this.setState({ imageInput: defaultSelectedImage });
  };

  render() {
    const { postDog, isLoading } = this.props;
    const { nameInput, imageInput, descriptionInput } = this.state;
    return (
      <form
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          postDog({
            name: nameInput,
            image: imageInput,
            description: descriptionInput,
            isFavorite: false,
          });
          this.resetState();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="name"
          value={nameInput}
          disabled={isLoading}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
        />

        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          cols={80}
          rows={10}
          disabled={isLoading}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
        />

        <label htmlFor="picture">Select an Image</label>
        <select
          name="picture"
          value={descriptionInput}
          defaultValue={defaultSelectedImage}
          disabled={isLoading}
          onChange={(e) => {
            this.setState({ imageInput: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
