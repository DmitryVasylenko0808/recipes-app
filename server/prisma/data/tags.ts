import { v4 as uuidv4 } from 'uuid';

export const tags = [
  { name: 'Quick' },
  { name: 'Healthy' },
  { name: 'Kid-Friendly' },
  { name: 'Gluten-Free' },
  { name: 'Low-Carb' },
  { name: 'Comfort Food' },
  { name: 'Spicy' },
  { name: 'Vegetarian' },
  { name: 'Vegan' },
  { name: 'Breakfast' },
  { name: 'Dinner' },
  { name: 'Snack' },
  { name: 'Party' },
  { name: 'Holiday' },
  { name: 'Easy' },
  { name: 'Intermediate' },
  { name: 'Advanced' },
  { name: 'Budget' },
  { name: 'Kid-Approved' },
  { name: 'Low-Fat' },
].map((item) => ({ ...item, id: uuidv4() }));
