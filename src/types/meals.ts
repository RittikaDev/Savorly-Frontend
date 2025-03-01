export interface IMeal {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  portionSize: string;
  price: number;
  dietaryPreferences: string[];
  cuisineType: string;
  providerId: string;
  availability: boolean;
  rating: number;
  image: string[];
}
