export interface ProductFormData {
  title: string;
  price: number;
  description: string;
}

export interface FormErrors {
  title?: string;
  price?: string;
  description?: string;
}