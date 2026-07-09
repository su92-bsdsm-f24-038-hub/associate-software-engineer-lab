'use client';

import React, { useState } from 'react';
import { validateProductData } from '@/src/domain/products/productRules';
import { ProductFormData, ProductFormErrors } from '@/src/domain/products/types';

interface ProductFormProps {
  initialData?: ProductFormData;
  isEditMode?: boolean;
  onSubmitSuccess: (data: ProductFormData) => void;
}

export default function ProductForm({ initialData, isEditMode = false, onSubmitSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const currentErrors = validateProductData(formData);
  const isFormInvalid = Object.keys(currentErrors).length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductData(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmitSuccess(formData);
    if (!isEditMode) {
      setFormData({ title: '', price: 0, description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {isEditMode ? '⚙️ Edit Product' : '➕ Create Product'}
      </h2>

      {/* Title Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Price Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price || ''}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <button
        type="submit"
        disabled={isFormInvalid}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
          isFormInvalid
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
        }`}
      >
        {isEditMode ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}