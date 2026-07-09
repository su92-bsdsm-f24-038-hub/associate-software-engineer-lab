"use client";

import { useRef, useState } from "react";
import { ProductApplicationService } from "@/src/application/products/ProductApplicationService";
import { Product, ProductFormData } from "@/src/domain/products/types";
import { InMemoryProductRepository } from "@/src/infrastructure/products/InMemoryProductRepository";

export function useProductCrud() {
  const serviceRef = useRef<ProductApplicationService>(
    new ProductApplicationService(new InMemoryProductRepository())
  );
  const service = serviceRef.current;

  const [products, setProducts] = useState<Product[]>(service.list());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const submitProduct = (data: ProductFormData) => {
    if (editingProduct) {
      setProducts(service.update(editingProduct.id, data));
      setEditingProduct(null);
      return;
    }

    setProducts(service.create(data));
  };

  const removeProduct = (productId: string) => {
    setProducts(service.remove(productId));
  };

  return {
    products,
    editingProduct,
    setEditingProduct,
    submitProduct,
    removeProduct,
  };
}
