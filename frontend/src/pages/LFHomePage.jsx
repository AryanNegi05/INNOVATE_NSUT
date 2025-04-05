import React, { useState } from 'react';

const LfHomePage = () => {
  // Dummy array of found items with various placeholder images
  const [foundItems, setFoundItems] = useState([
    {
      id: 1,
      title: "Silver Watch",
      description: "Found at Central Park near the fountain. Brand appears to be Seiko.",
      location: "Central Park",
      date: "2025-03-28",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      finder: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "555-123-4567"
      }
    },
    {
      id: 2,
      title: "House Keys",
      description: "Set of 3 keys with a blue keychain. Found near the library entrance.",
      location: "Public Library",
      date: "2025-04-01",
      image: "https://images.unsplash.com/photo-1581159936322-d5e1845857d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      finder: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "555-987-6543"
      }
    },
    {
      id: 3,
      title: "Black Wallet",
      description: "Small leather wallet with no ID inside, but has some cash. Found at coffee shop.",
      location: "Starbucks on Main St",
      date: "2025-04-03",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      finder: {
        name: "Mike Davis",
        email: "mike.d@example.com",
        phone: "555-456-7890"
      }
    },
    {
      id: 4,
      title: "Prescription Glasses",
      description: "Black-framed glasses in a blue case. Found on the bus #42.",
      location: "City Bus Terminal",
      date: "2025-04-02",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      finder: {
        name: "Lisa Wilson",
        email: "lisa.w@example.com",
        phone: "555-222-3333"
      }
    },
    {
      id: 5,
      title: "iPhone 18",
      description: "Latest model iPhone with a cracked screen protector. No passcode.",
      location: "Downtown Mall",
      date: "2025-04-04",
      image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      finder: {
        name: "Robert Chen",
        email: "robert.c@example.com",
        phone: "555-777-8888"
      }
    },
    {
      id: 6,
      title: "Student ID Card",
      description: "University ID card for Sarah Williams. Found near the science building.",
      location: "State University",
      date: "2025-03-30",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      finder: {
        name: "James Taylor",
        email: "james.t@example.com",
        phone: "555-444-5555"
      }
    }
  ]);

  // State to track which contact modal is open
  const [activeContact, setActiveContact] = useState(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    image: null
  });

  // Function to handle contact button click
  const handleContactClick = (itemId) => {
    setActiveContact(itemId);
  };

  // Function to close contact modal
  const closeContactModal = () => {
    setActiveContact(null);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // In a real app, you might send this data to an API endpoint
    alert("Thank you for your submission. The finder will be notified.");
    closeContactModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lost & Found Items</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Location: {item.location}</span>
                <span>Date: {item.date}</span>
              </div>
              <button
                onClick={() => handleContactClick(item.id)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Contact Finder
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal with Form */}
      {activeContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Claim This Item</h3>
            {foundItems.find(item => item.id === activeContact) && (
              <div className="mb-4">
                <p className="font-medium">Item: {foundItems.find(item => item.id === activeContact).title}</p>
                <p className="text-sm text-gray-500">Found by: {foundItems.find(item => item.id === activeContact).finder.name}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-1">Upload Proof of Ownership</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <input
                    type="file"
                    id="upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <label htmlFor="upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">
                        {formData.image ? formData.image.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Describe the item in detail (to prove ownership)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Please provide specific details about the item that only the owner would know..."
                ></textarea>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Submit Claim
                </button>
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LfHomePage;