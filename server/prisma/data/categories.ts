import { v4 as uuidv4 } from 'uuid';

export const categories = [
  { name: 'Soups' },
  { name: 'Main Dishes' },
  { name: 'Salads' },
  { name: 'Desserts' },
  { name: 'Beverages' },
  { name: 'Breakfast' },
  { name: 'Snacks' },
  { name: 'Appetizers' },
  { name: 'Seafood' },
  { name: 'Vegetarian' },
  { name: 'Vegan' },
  { name: 'Pasta' },
  { name: 'Grilled' },
  { name: 'Baked Goods' },
  { name: 'Sauces' },
].map((item) => ({ ...item, id: uuidv4() }));
