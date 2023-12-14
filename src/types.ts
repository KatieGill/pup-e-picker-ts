export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
}

export type ActiveComponent = "all" | "favorited" | "unfavorited" | "create-dog-form"
