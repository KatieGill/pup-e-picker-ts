import { useRef, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  postDog,
  isLoading,
}: {
  postDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState(defaultSelectedImage);
  const dropDown = useRef<HTMLSelectElement>(null);

  const resetState = () => {
    setNameInput("");
    setDescriptionInput("");
    setImageInput(defaultSelectedImage);
    if (dropDown.current) dropDown.current.value = defaultSelectedImage;
  };

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
        resetState();
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
          setNameInput(e.target.value);
        }}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        value={descriptionInput}
        cols={80}
        rows={10}
        disabled={isLoading}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        name="picture"
        ref={dropDown}
        defaultValue={defaultSelectedImage}
        disabled={isLoading}
        onChange={(e) => {
          setImageInput(e.target.value);
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
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
