export interface Product {
    id: number;
    name: string | null;
    description: string | null;
    price: number | 0;
    picture: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }