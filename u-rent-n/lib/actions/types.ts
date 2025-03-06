export interface Product {
    id: number;
    name: string | null;
    description: string | null;
    price: string | null;
    picture: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }