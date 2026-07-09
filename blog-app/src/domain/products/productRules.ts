import { Product, ProductFormData, ProductFormErrors } from "@/src/domain/products/types";

const normalizeText = (value: string): string => value.trim().replace(/\s+/g, " ");

export function validateProductData(data: ProductFormData): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (!normalizeText(data.title)) {
    errors.title = "Product title is required";
  }

  if (data.price <= 0) {
    errors.price = "Price must be greater than 0";
  }

  if (normalizeText(data.description).length < 10) {
    errors.description = "Description must be at least 10 characters long";
  }

  return errors;
}

export function createProductEntity(
  data: ProductFormData,
  idFactory: () => string = () => crypto.randomUUID(),
  dateFactory: () => string = () => new Date().toISOString()
): Product {
  const errors = validateProductData(data);

  if (Object.keys(errors).length > 0) {
    throw new Error("Invalid product form data");
  }

  return {
    id: idFactory(),
    title: normalizeText(data.title),
    price: data.price,
    description: normalizeText(data.description),
    createdAt: dateFactory(),
  };
}

export function applyProductUpdate(product: Product, data: ProductFormData): Product {
  const errors = validateProductData(data);

  if (Object.keys(errors).length > 0) {
    throw new Error("Invalid product form data");
  }

  return {
    ...product,
    title: normalizeText(data.title),
    price: data.price,
    description: normalizeText(data.description),
  };
}
