'use client';

import React, { useState, useEffect } from 'react';
import { ProductFormData, FormErrors } from '@/types/product';

interface ProductFormProps {
  initialData?: ProductFormData;
  isEditMode?: boolean;
  onSubmitSuccess: (data: ProductFormData) => void;
}

export default function ProductForm({ initialData, isEditMode = false, onSubmitSuccess }: ProductFormProps) {
  // Form State
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
  });

  // UI States
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Validation Logic
  const validateForm = (data: ProductFormData): FormErrors => {
    const activeErrors: FormErrors = {};
    if (!data.title.trim()) activeErrors.title = 'Product title is required';
    if (data.price <= 0) activeErrors.price = 'Price must be greater than 0';
    if (data.description.trim().length < 10) {
      activeErrors.description = 'Description must be at least 10 characters long';
    }
    return activeErrors;
  };

  // Run validation whenever form data changes to check if button should be disabled
  const currentErrors = validateForm(formData);
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
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Mock API Submission / Confirmation State
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      onSubmitSuccess(formData);
    }, 1500);
  };

  if (isConfirmed) {
    return (
      <div className="p-6 max-w-md mx-auto bg-green-50 border border-green-200 text-green-800 rounded-lg text-center shadow-sm">
        <h3 className="text-xl font-bold mb-2">🎉 Success!</h3>
        <p>Product has been successfully {isEditMode ? 'updated' : 'created'}.</p>
        <button 
          onClick={() => setIsConfirmed(false)} 
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition"
        >
          Add Another Product
        </button>
      </div>
    );
  }

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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isFormInvalid || isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
          isFormInvalid || isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
        }`}
      >
        {isSubmitting ? 'Submitting...' : isEditMode ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}