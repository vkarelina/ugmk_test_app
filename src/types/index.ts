export interface Product {
  id: string;
  factory_id: number;
  date: string;
  product1: number;
  product2: number;
  product3: number;
}

export type FactoryId = 1 | 2;

export interface ProductSeria {
  product_1: number; 
  product_2: number; 
  product_3: number; 
}

export interface Serialization {
  factory_1: ProductSeria[],
  factory_2: ProductSeria[],
}
