export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  createdAt: string;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
}

export interface ProductFormErrors {
  title?: string;
  price?: string;
  description?: string;
}
