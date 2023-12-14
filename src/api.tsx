import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: () =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),

  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  },

  deleteDog: (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
  updateDog: (dog: Dog, isFavorite: boolean) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      body: JSON.stringify({ isFavorite: isFavorite }),
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
