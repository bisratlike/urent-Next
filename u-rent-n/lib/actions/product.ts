"use server";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { Product } from './types';

export async function createProduct(productData: Omit<Product, 'id'>) {
  try {
      console.log("Product Data:", productData);

      const [newProduct] = await db.insert(products).values({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          picture: productData.picture,
      }).returning();

      console.log("New Product:", newProduct);
      return newProduct;
  } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
  }
}

export async function getProducts() {
  try {
      const productList = await db.select().from(products).orderBy(asc(products.name));
      return productList;
  } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
  }
}

export async function getProductById(productId: number) {
    try {
        const [product] = await db.select().from(products).where(eq(products.id, productId));
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
    }
  }