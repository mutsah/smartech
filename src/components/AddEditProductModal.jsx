import React, { useState, useEffect, useContext } from 'react';
import { Upload } from 'lucide-react';
import { addProduct, updateProduct } from '../api/productAPI';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const AddEditProductModal = ({ type, product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
    image: null,
    imageFile: null, // Store the actual File object
    imagePreview: null, // Store the preview URL
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { refreshProducts } = useContext(ShopContext);

  useEffect(() => {
    if (type === 'edit' && product) {
      setFormData({
        name: product.title || '',
        price: product.price || '',
        description: product.description || '',
        stock: product.stock || '',
        category: product.category || '',
        image: product.image || null,
        imageFile: null,
        imagePreview: product.image || null,
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        price: '',
        description: '',
        stock: '',
        category: '',
        image: null,
        imageFile: null,
        imagePreview: null,
      });
    }
    setErrors({});
  }, [type, product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        imageFile: file, // Store the actual File object
        imagePreview: imageUrl, // Store the preview URL
        image: file, // This will be used by the API
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a valid non-negative number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.imageFile, // Use the File object for API
    };

    if (type === 'edit' && product) {
      try {
        productData.id = product.id;
        const response = await updateProduct(productData, product.id);
        if (response.success) {
          setFormData({
            name: '',
            price: '',
            description: '',
            stock: '',
            category: '',
            image: null,
            imageFile: null,
            imagePreview: null,
          });
          onClose();
          await refreshProducts();
          toast.success('Product updated successfully');
          // navigate("/dashboard");
        }
        setIsLoading(false);
      } catch (error) {
        toast.error('Error updating product:', error);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await addProduct(productData);
        if (response.success) {
          setFormData({
            name: '',
            price: '',
            description: '',
            stock: '',
            category: '',
            image: null,
            imageFile: null,
            imagePreview: null,
          });
          onClose();
          await refreshProducts();
          toast.success('Product added successfully');
          navigate('/dashboard');
        }
        setIsLoading(false);
      } catch (error) {
        toast.error('Error adding product:', error);
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  };

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'audio', label: 'Audio' },
    { value: 'computers', label: 'Computers' },
    { value: 'mobile', label: 'Mobile & Tablets' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter product name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.price ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.stock ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0"
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.category ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="3"
          placeholder="Enter product description "
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {formData.imagePreview ? (
              <div className="mb-4">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="mx-auto h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      image: null,
                      imageFile: null,
                      imagePreview: null,
                    }))
                  }
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <span>{type === 'add' ? 'Add Product' : 'Save Changes'}</span>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEditProductModal;
