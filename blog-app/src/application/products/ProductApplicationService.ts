import { ProductRepository } from "@/src/application/products/ports/ProductRepository";
import { Product, ProductFormData } from "@/src/domain/products/types";

export class ProductApplicationService {
  constructor(private readonly productRepository: ProductRepository) {}

  list(): Product[] {
    return this.productRepository.list();
  }

  create(data: ProductFormData): Product[] {
    return this.productRepository.save(data);
  }

  update(productId: string, data: ProductFormData): Product[] {
    return this.productRepository.update(productId, data);
  }

  remove(productId: string): Product[] {
    return this.productRepository.remove(productId);
  }
}
