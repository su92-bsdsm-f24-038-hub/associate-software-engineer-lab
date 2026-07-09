import { Product, ProductFormData } from "@/src/domain/products/types";

export interface ProductRepository {
  list(): Product[];
  save(data: ProductFormData): Product[];
  update(productId: string, data: ProductFormData): Product[];
  remove(productId: string): Product[];
}
