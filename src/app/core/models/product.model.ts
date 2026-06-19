export interface Product {
  id: string;
  name: string;
  category: 'Pickle' | 'Podi';
  shortDescription: string;
  description: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  bestWith: string[];
  ingredients: string[];
  storageInstructions: string;
  shelfLife: string;
  allergenWarning: string;
  imagePath: string;
  secondaryImagePath?: string;
}
