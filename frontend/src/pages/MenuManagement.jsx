import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon, DollarSign, Tag, FileText, Package, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MenuManagement = () => {
  const [dishes, setDishes] = useState([{
    name: '',
    price: 0,
    description: '',
    quantityAvailable: 0,
    tags: [],
    image: '',
    category: 'main',
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    prepTime: 15
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [expandedDishes, setExpandedDishes] = useState([true]);

  const categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'drink', label: 'Drink' },
    { value: 'side', label: 'Side Dish' }
  ];

  const handleAddDish = () => {
    setDishes([...dishes, {
      name: '',
      price: 0,
      description: '',
      quantityAvailable: 0,
      tags: [],
      image: '',
      category: 'main',
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      prepTime: 15
    }]);
    setExpandedDishes([...expandedDishes, true]);
  };

  const handleRemoveDish = (index) => {
    if (dishes.length === 1) {
      toast.error("You must have at least one dish");
      return;
    }
    setDishes(dishes.filter((_, i) => i !== index));
    setExpandedDishes(expandedDishes.filter((_, i) => i !== index));
    toast.success("Dish removed");
  };

  const toggleExpandDish = (index) => {
    const newExpanded = [...expandedDishes];
    newExpanded[index] = !newExpanded[index];
    setExpandedDishes(newExpanded);
  };

  const handleDishChange = (index, field, value) => {
    const newDishes = [...dishes];
    if (field === 'tags') {
      newDishes[index] = {
        ...newDishes[index],
        [field]: value.split(',').map((tag) => tag.trim()).filter(tag => tag !== '')
      };
    } else if (field === 'isVegan' || field === 'isVegetarian' || field === 'isGlutenFree') {
      newDishes[index] = {
        ...newDishes[index],
        [field]: !newDishes[index][field]
      };
    } else {
      newDishes[index] = {
        ...newDishes[index],
        [field]: value
      };
    }
    setDishes(newDishes);
  };

  const handlePreviewImage = (url, e) => {
    e.stopPropagation();
    setPreviewImage(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/menu', dishes);
      toast.success('Menu updated successfully!', {
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
        }
      });
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update menu', {
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
        }
      });
      console.error('Error updating menu:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <p className="mt-2 opacity-90">Add, update or remove dishes in your restaurant menu</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {dishes.map((dish, index) => (
              <div 
                key={index} 
                className="mb-6 bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-lg"
              >
                <div 
                  className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpandDish(index)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {dish.name || `New Dish ${index + 1}`}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {dish.image && (
                      <button
                        type="button"
                        onClick={(e) => handlePreviewImage(dish.image, e)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDish(index);
                      }}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleExpandDish(index)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      {expandedDishes[index] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedDishes[index] && (
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          Dish Name*
                        </label>
                        <input
                          type="text"
                          value={dish.name}
                          onChange={(e) => handleDishChange(index, 'name', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          placeholder="Spaghetti Carbonara"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                          Price*
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            value={dish.price}
                            onChange={(e) => handleDishChange(index, 'price', parseFloat(e.target.value) || 0)}
                            className="block w-full rounded-lg border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <Package className="h-4 w-4 mr-2 text-gray-500" />
                          Quantity Available*
                        </label>
                        <input
                          type="number"
                          value={dish.quantityAvailable}
                          onChange={(e) => handleDishChange(index, 'quantityAvailable', parseInt(e.target.value) || 0)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          placeholder="10"
                          min="0"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Category*
                        </label>
                        <select
                          value={dish.category}
                          onChange={(e) => handleDishChange(index, 'category', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border bg-white"
                        >
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={dish.image}
                          onChange={(e) => handleDishChange(index, 'image', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Preparation Time (minutes)
                        </label>
                        <input
                          type="number"
                          value={dish.prepTime}
                          onChange={(e) => handleDishChange(index, 'prepTime', parseInt(e.target.value) || 0)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          placeholder="15"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        Description
                      </label>
                      <textarea
                        value={dish.description}
                        onChange={(e) => handleDishChange(index, 'description', e.target.value)}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                        rows={3}
                        placeholder="A delicious Italian pasta dish with eggs, cheese, pancetta, and pepper"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-gray-500" />
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={dish.tags.join(', ')}
                          onChange={(e) => handleDishChange(index, 'tags', e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                          placeholder="pasta, italian, gluten, main course"
                        />
                        {dish.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {dish.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex} 
                                className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Dietary Options
                        </label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={dish.isVegetarian}
                              onChange={() => handleDishChange(index, 'isVegetarian')}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Vegetarian</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={dish.isVegan}
                              onChange={() => handleDishChange(index, 'isVegan')}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Vegan</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={dish.isGlutenFree}
                              onChange={() => handleDishChange(index, 'isGlutenFree')}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Gluten Free</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <button
                type="button"
                onClick={handleAddDish}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Dish
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-xl text-white ${
                  isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Menu'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
            <div className="p-4">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-auto rounded-lg object-contain max-h-[80vh]" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;