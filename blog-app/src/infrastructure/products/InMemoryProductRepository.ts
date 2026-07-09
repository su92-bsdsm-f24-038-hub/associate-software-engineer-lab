import { ProductRepository } from "@/src/application/products/ports/ProductRepository";
import { applyProductUpdate, createProductEntity } from "@/src/domain/products/productRules";
import { Product, ProductFormData } from "@/src/domain/products/types";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  list(): Product[] {
    return [...this.products];
  }

  save(data: ProductFormData): Product[] {
    const next = createProductEntity(data);
    this.products = [next, ...this.products];
    return this.list();
  }

  update(productId: string, data: ProductFormData): Product[] {
    this.products = this.products.map((product) =>
      product.id === productId ? applyProductUpdate(product, data) : product
    );

    return this.list();
  }

  remove(productId: string): Product[] {
    this.products = this.products.filter((product) => product.id !== productId);
    return this.list();
  }
}
