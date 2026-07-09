import { Product, ProductFormData, ProductFormErrors } from "./types";

const normalizeText = (value: string): string => value.trim().replace(/\s+/g, " ");

export function validateProductForm(data: ProductFormData): ProductFormErrors {
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

export function createProduct(data: ProductFormData, idFactory: () => string = () => crypto.randomUUID()): Product {
  const errors = validateProductForm(data);

  if (Object.keys(errors).length > 0) {
    throw new Error("Invalid product form data");
  }

  return {
    id: idFactory(),
    title: normalizeText(data.title),
    price: data.price,
    description: normalizeText(data.description),
    createdAt: new Date().toISOString(),
  };
}

export function updateProduct(products: Product[], productId: string, data: ProductFormData): Product[] {
  const errors = validateProductForm(data);

  if (Object.keys(errors).length > 0) {
    throw new Error("Invalid product form data");
  }

  return products.map((product) =>
    product.id === productId
      ? {
          ...product,
          title: normalizeText(data.title),
          price: data.price,
          description: normalizeText(data.description),
        }
      : product
  );
}

export function deleteProduct(products: Product[], productId: string): Product[] {
  return products.filter((product) => product.id !== productId);
}
