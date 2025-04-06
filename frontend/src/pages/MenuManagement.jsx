import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodayMenu = ({setActiveSection}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMenu, setNewMenu] = useState([]);
  const [analysisResult, setAnalysisResult] = useState('');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantityAvailable: '',
    category: '',
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    prepTime: '',
    tags: '',
    image: null
  });

  useEffect(() => {
    fetchTodayMenu();
  }, []);

  const fetchTodayMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://innovate-nsut.onrender.com/api/v1/todaymenu');
      setMenuItems(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch menu');
      setLoading(false);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      price: parseFloat(formData.price),
      quantityAvailable: parseInt(formData.quantityAvailable),
      prepTime: parseInt(formData.prepTime),
      tags: formData.tags.split(',').map(tag => tag.trim()),
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : null
    };

    setNewMenu([...newMenu, newItem]);

    setFormData({
      name: '',
      price: '',
      description: '',
      quantityAvailable: '',
      category: '',
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      prepTime: '',
      tags: '',
      image: null
    });
  };

  const uploadTodayMenu = async () => {
    try {
      await axios.post('https://innovate-nsut.onrender.com/api/v1/todaymenu', newMenu);
      alert("Today's menu uploaded successfully!");
      fetchTodayMenu();
      setNewMenu([]);
    } catch (err) {
      alert('Failed to upload menu');
      console.error(err);
    }
  };

  const updateTodayMenu = async () => {
    try {
      await axios.put('https://innovate-nsut.onrender.com/api/v1/todaymenu', newMenu.length > 0 ? newMenu : menuItems);
      alert("Today's menu updated successfully!");
      fetchTodayMenu();
      setNewMenu([]);
    } catch (err) {
      alert('Failed to update menu');
      console.error(err);
    }
  };

  const removeFromNewMenu = (index) => {
    setNewMenu(newMenu.filter((_, i) => i !== index));
  };

  const getAnalysis = async () => {
    try {
      const res = await axios.post('https://innovate-nsut.onrender.com/api/v1/aibaseddishes');
      setAnalysisResult(res.data.analysis || 'No analysis available.');
      setShowAnalysisModal(true);
    } catch (err) {
      console.error('Failed to fetch analysis:', err);
      alert('Failed to fetch analysis');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Today's Menu Management</h1>

      {/* Get Analysis Button */}
      <div className="mb-6">
        <button
          onClick={getAnalysis}
          className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
        >
          Get Analysis
        </button>
      </div>
      <div className="mb-6">
        <button
          onClick={() => setActiveSection('canteenorders')}
          className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
        >
          See Orders
        </button>
      </div>

      {/* Current Menu Display */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Current Menu</h2>
        {menuItems.length === 0 ? (
          <p>No items in today's menu yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div key={item._id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-medium">{item.name}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.isVegetarian && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegetarian</span>
                  )}
                  {item.isVegan && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegan</span>
                  )}
                  {item.isGlutenFree && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Gluten Free</span>
                  )}
                </div>
                <p className="text-sm mt-2">Available: {item.quantityAvailable}</p>
                <p className="text-sm">Prep time: {item.prepTime} mins</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Menu Item Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Menu Item</h2>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="grid grid-cols-1 gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Name *" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Price *" step="0.01" required />
              <input type="number" name="quantityAvailable" value={formData.quantityAvailable} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Quantity *" required />
            </div>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows="3" placeholder="Description" />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded" required>
              <option value="">Select category</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Side">Side</option>
            </select>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Tags (comma separated)" />
            <input type="number" name="prepTime" value={formData.prepTime} onChange={handleChange} className="w-full px-3 py-2 border rounded" placeholder="Prep Time (minutes)" />
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center"><input type="checkbox" name="isVegetarian" checked={formData.isVegetarian} onChange={handleChange} className="mr-2" />Vegetarian</label>
              <label className="flex items-center"><input type="checkbox" name="isVegan" checked={formData.isVegan} onChange={handleChange} className="mr-2" />Vegan</label>
              <label className="flex items-center"><input type="checkbox" name="isGlutenFree" checked={formData.isGlutenFree} onChange={handleChange} className="mr-2" />Gluten Free</label>
            </div>
            <input type="file" name="image" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full px-3 py-2 border rounded" required />
            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Add to New Menu</button>
          </div>
        </form>
      </div>

      {/* New Menu Items Preview */}
      {newMenu.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">New Menu Items to Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newMenu.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm relative">
                <button className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeFromNewMenu(index)}>✕</button>
                <h3 className="text-xl font-medium">{item.name}</h3>
                <p className="text-gray-700">${parseFloat(item.price).toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.isVegetarian && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegetarian</span>}
                  {item.isVegan && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegan</span>}
                  {item.isGlutenFree && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Gluten Free</span>}
                </div>
                <p className="text-sm mt-2">Available: {item.quantityAvailable}</p>
                <p className="text-sm">Prep time: {item.prepTime} mins</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button onClick={uploadTodayMenu} className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600">Upload New Menu Items</button>
            <button onClick={updateTodayMenu} className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600">Replace Entire Menu</button>
          </div>
        </div>
      )}

      {/* Update button for existing menu */}
      {menuItems.length > 0 && newMenu.length === 0 && (
        <button onClick={updateTodayMenu} className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600">
          Update Today's Menu
        </button>
      )}

      {/* Analysis Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowAnalysisModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">AI-Based Dish Analysis</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{analysisResult}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayMenu;