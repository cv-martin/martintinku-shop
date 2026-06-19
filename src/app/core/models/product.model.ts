export interface Product {
  id: string;
  name: string;
  category: 'Pickles' | 'Non-Veg Pickles' | 'Podis / Spice Powders' | 'Combo Boxes' | 'Seasonal Specials';
  shortDescription: string;
  description: string;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot' | 'Andhra Fire';
  bestWith: string[];
  ingredients: string[];
  storageInstructions: string;
  shelfLife: string;
  allergenWarning: string;
  imagePath: string;
  secondaryImagePath?: string;
  availabilityStatus: 'Preorder Interest Open' | 'Coming Soon' | 'Limited Batch' | 'Availability Under Review';
  includedItems?: string[];
  isCombo?: boolean;
}
