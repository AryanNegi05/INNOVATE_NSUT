import React, { useState ,useEffect} from 'react';
import axios from 'axios'
import { 
  Search, 
  Home, 
  MapPin, 
  Coffee, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Bell, 
  LogOut, 
  Package, 
  Clipboard, 
  Clock,
  Plus,
  Upload,
  Camera
} from 'lucide-react';
import TodayMenu from './MenuManagement';
import OrdersMangement from './OrdersManagement'
import StudentManagement from './StudentOrder'

const PurpleDashboard = ({Email}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('lostAndFound');
  const [activeSubsection, setActiveSubsection] = useState(null);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const selectSection = (section) => {
    setActiveSection(section);
    setActiveSubsection(null);
  };
  
  const selectSubsection = (subsection) => {
    setActiveSubsection(subsection);
  };
  

  // Component for Found Items subsection
  
const FoundItemsComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [message, setMessage] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
    
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/item/items", {
          withCredentials: true,
        });
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching found items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    Email=localstorage.getItem('email');
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProofImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofImage) {
      setStatusMessage("Proof image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("itemId", selectedItemId);
    formData.append("message", message);
    formData.append("image", proofImage);

    try {
      const res = await axios.post("http://localhost:3000/api/v1/item/claim", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusMessage(res.data.message);
      setMessage("");
      setProofImage(null);
      setPreview(null);
      setIsModalOpen(false); // close modal after submit
    } catch (err) {
      console.error("Claim Error:", err.response?.data || err);
      setStatusMessage(err.response?.data?.message || "Failed to submit claim.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Found Items</h3>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No found items to display.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md border border-purple-100"
            >
              <div className="w-full h-32 bg-purple-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <Package size={40} className="text-purple-400" />
                )}
              </div>
              <h4 className="font-medium text-purple-900">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-2">
                Found at {item.landmark}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toDateString()}
              </p>
              <button
                className="mt-3 w-full bg-purple-900 hover:bg-purple-800 text-white py-2 rounded-md text-sm"
                onClick={() => {
                  setSelectedItemId(item._id);
                  setIsModalOpen(true);
                  setMessage("");
                  setPreview(null);
                  setProofImage(null);
                  setStatusMessage("");
                }}
              >
                Request Item
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-purple-900">Submit Claim</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                placeholder="Describe how this item belongs to you..."
                required
              />

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Proof
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              {statusMessage && (
                <p className="text-sm text-red-600 mb-2">{statusMessage}</p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-800 text-white py-2 px-4 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

  
  // Component for My Listings subsection
  const MyListingsComponent = () => {
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedItem, setExpandedItem] = useState(null);
    const [claimRequests, setClaimRequests] = useState({});
    const [loadingRequests, setLoadingRequests] = useState({});
  
    useEffect(() => {
      const fetchMyListings = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/v1/item/my-listings", {
            withCredentials: true, // required for cookie/session auth
          });
          console.log(res.data);
          setMyListings(res.data);
        } catch (err) {
          console.error("Error fetching listings:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMyListings();
    }, []);
  
    const fetchItemRequests = async (itemId) => {
      setLoadingRequests(prev => ({ ...prev, [itemId]: true }));
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/item/requests/${itemId}`, {
          withCredentials: true,
        });
        setClaimRequests(prev => ({ ...prev, [itemId]: res.data }));
      } catch (err) {
        console.error(`Error fetching requests for item ${itemId}:`, err);
        setClaimRequests(prev => ({ ...prev, [itemId]: [] }));
      } finally {
        setLoadingRequests(prev => ({ ...prev, [itemId]: false }));
      }
    };
  
    const toggleItemExpand = (itemId) => {
      if (expandedItem === itemId) {
        setExpandedItem(null);
      } else {
        setExpandedItem(itemId);
        if (!claimRequests[itemId]) {
          fetchItemRequests(itemId);
        }
      }
    };
  
    const handleRequestAction = async (requestId, action) => {
      try {
        await axios.put(
          `http://localhost:3000/api/v1/item/request/${requestId}/${action}`,
          {},
          { withCredentials: true }
        );
        
        // Refresh the claim requests for this item
        if (expandedItem) {
          fetchItemRequests(expandedItem);
        }
      } catch (err) {
        console.error(`Error ${action} request:`, err);
      }
    };
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    // console.log(myListings)
  
    return (
    
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-900">My Listings</h3>
        </div>
  
        {loading ? (
          <p className="p-4 text-gray-500 bg-white rounded-lg shadow-md">Loading...</p>
        ) : myListings.length === 0 ? (
          <p className="p-4 text-gray-500 bg-white rounded-lg shadow-md">No listings found.</p>
        ) : (
          <div className="space-y-4">
            {myListings.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => toggleItemExpand(item._id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-md overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <Package size={24} className="text-purple-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        Listed on {formatDate(item.createdAt)} • {item.landmark}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                  <button
  className={`px-3 py-1 text-xs font-semibold rounded-full ${
    item.status === "found"
      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      : "bg-blue-100 text-blue-800 cursor-default"
  }`}
>
  {item.status === "found" ? "Approve" : "Resolved"}
</button>

                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${expandedItem === item._id ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
  
                {expandedItem === item._id && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h5 className="font-medium text-gray-700 mb-3">Claim Requests</h5>
                    
                    {loadingRequests[item._id] ? (
                      <p className="text-sm text-gray-500 py-2">Loading requests...</p>
                    ) : !claimRequests[item._id] || claimRequests[item._id].length === 0 ? (
                      <p className="text-sm text-gray-500 py-2">No claim requests for this item yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {claimRequests[item._id].map((request) => (
                          <div key={request._id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{request.claimedBy?.name || "Anonymous"}</span>
                                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                                    request.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : request.status === "accepted"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Requested on {formatDate(request.createdAt)}
                                </p>
                                <p className="text-sm mt-2">{request.message}</p>
                                
                                {request.proof && (
                                  <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-1">Proof of Ownership:</p>
                                    <img 
                                      src={request.proof} 
                                      alt="Proof" 
                                      className="h-24 object-cover rounded-md border border-gray-200" 
                                    />
                                  </div>
                                )}
                              </div>
                              
                              {request.status === "pending" && (
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => handleRequestAction(request._id, 'accept')}
                                    className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
                                  >
                                    Accept
                                  </button>
                                  <button 
                                    onClick={() => handleRequestAction(request._id, 'reject')}
                                    className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Component for My Requests subsection
  const MyRequestsComponent = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchMyRequests = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/v1/item/my-requests", {
            withCredentials: true,
          });
          setRequests(res.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching requests:", error);
          setError("Failed to load your requests. Please try again later.");
          setLoading(false);
        }
      };
  
      fetchMyRequests();
    }, []);
  
    // Function to format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };
  
    // Function to get status display class
    const getStatusClass = (status) => {
      switch(status) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "accepted":
          return "bg-green-100 text-green-800";
        case "rejected":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    // Function to get capitalized status text
    const getStatusText = (status) => {
      return status.charAt(0).toUpperCase() + status.slice(1);
    };
  
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold text-purple-900 mb-4">My Requests</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Loading your requests...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You haven't made any requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-900">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-purple-900">{request.foundItem.title}</h4>
                    <p className="text-sm text-gray-600">Requested on {formatDate(request.createdAt)}</p>
                    <p className="text-sm text-gray-600">
                      Found at: {request.foundItem.landmark}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                  {request.status === "pending" && (
                    <button className="text-sm text-gray-500 hover:text-red-600 mr-4">
                      Cancel Request
                    </button>
                  )}
                  <button className="text-sm text-purple-900 hover:text-purple-700">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // New Post Component for Reporting Found Items
  const PostFoundItemComponent = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      landmark: '',
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!image) {
          setMessage('Image is required');
          return;
        }
      
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('category', formData.category);
        form.append('landmark', formData.landmark);
        form.append('image', image); // Must match `req.files.image`
      
        try {
          setMessage('Uploading...');
      
          const res = await axios.post(
            'http://localhost:3000/api/v1/item/found-items', // Replace with your actual route
            form,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true, // Important if cookies are needed (for auth)
            }
          );
      
          setMessage(res.data.message || 'Item reported successfully!');
          console.log('Upload response:', res.data);
      
          // Reset form
          setFormData({
            title: '',
            description: '',
            category: '',
            landmark: '',
          });
          setImage(null);
          setImagePreview(null);
      
        } catch (err) {
          console.error('Upload error:', err.response?.data || err);
          setMessage(err.response?.data?.message || 'Upload failed.');
        }
      };
      
    
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold text-purple-900 mb-4">Report Found Item</h3>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
          {message && (
            <div className={`mb-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title of the found item"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Describe the item you found"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
              <input
                type="text"
                name="landmark"
                placeholder="Where did you find the item?"
                value={formData.landmark}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <div className="flex items-center">
                <label className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full rounded-md object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera size={24} className="mx-auto text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Click to upload image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-purple-900 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
            >
              <Upload size={18} className="mr-2" />
              Submit Report
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  // Component for Canteen section
  const CanteenComponent = () => (
    <TodayMenu setActiveSection={setActiveSection} />
  );
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-purple-900 text-white flex flex-col`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-purple-800">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul>
            <li className="px-4 py-3 hover:bg-purple-800 flex items-center cursor-pointer">
              <Home size={20} />
              {sidebarOpen && <span className="ml-4">Home</span>}
            </li>
            <li 
              className={`px-4 py-3 flex items-center cursor-pointer ${activeSection === 'lostAndFound' ? 'bg-purple-800' : 'hover:bg-purple-800'}`}
              onClick={() => selectSection('lostAndFound')}
            >
              <MapPin size={20} />
              {sidebarOpen && <span className="ml-4">Lost and Found</span>}
            </li>
            <li 
              className={`px-4 py-3 flex items-center cursor-pointer ${activeSection === 'canteen' ? 'bg-purple-800' : 'hover:bg-purple-800'}`}
              onClick={() => {
                const type = localStorage.getItem('type');
                {
                    type === "Student" ? (selectSection('studentorders')) : (selectSection('canteen'))
                }
                
                }}
            >
              <Coffee size={20} />
              {sidebarOpen && <span className="ml-4">Canteen</span>}
            </li>
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 mt-auto border-t border-purple-800 flex items-center">
          <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center text-purple-900">
            <User size={18} />
          </div>
          {sidebarOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium"></p>
              <p className="text-xs text-purple-300">{Email}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search size={18} className="text-gray-500" />
              <input 
                className="bg-transparent border-none ml-2 outline-none w-full placeholder-gray-500"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
                <LogOut size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Dashboard</h2>
          
          {/* Conditional rendering based on active section */}
          {activeSection === 'lostAndFound' && (
            <>
              {/* Lost and Found Subsection Navigation */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="bg-purple-900 text-white p-4">
                  <h3 className="text-lg font-semibold">Lost and Found</h3>
                </div>
                <div className="flex border-b">
                  <button 
                    className={`flex-1 py-3 px-4 text-center font-medium ${activeSubsection === 'foundItems' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-gray-600 hover:text-purple-900'}`}
                    onClick={() => selectSubsection('foundItems')}
                  >
                    Found Items
                  </button>
                  <button 
                    className={`flex-1 py-3 px-4 text-center font-medium ${activeSubsection === 'myListings' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-gray-600 hover:text-purple-900'}`}
                    onClick={() => selectSubsection('myListings')}
                  >
                    My Listings
                  </button>
                  <button 
                    className={`flex-1 py-3 px-4 text-center font-medium ${activeSubsection === 'myRequests' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-gray-600 hover:text-purple-900'}`}
                    onClick={() => selectSubsection('myRequests')}
                  >
                    My Requests
                  </button>
                  <button 
                    className={`flex-1 py-3 px-4 text-center font-medium ${activeSubsection === 'postItem' ? 'text-purple-900 border-b-2 border-purple-900' : 'text-gray-600 hover:text-purple-900'}`}
                    onClick={() => selectSubsection('postItem')}
                  >
                    <div className="flex items-center justify-center">
                      <Plus size={16} className="mr-1" />
                      Post Item
                    </div>
                  </button>
                </div>
                
                {/* Render the appropriate subsection component */}
                {activeSubsection === 'foundItems' && <FoundItemsComponent />}
                {activeSubsection === 'myListings' && <MyListingsComponent />}
                {activeSubsection === 'myRequests' && <MyRequestsComponent />}
                {activeSubsection === 'postItem' && <PostFoundItemComponent />}
                
                {/* Default view when no subsection is selected */}
                {!activeSubsection && (
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin size={32} className="text-purple-800" />
                    </div>
                    <h3 className="text-lg font-medium text-purple-900 mb-2">Lost and Found Portal</h3>
                    <p className="text-gray-600 mb-4">Select a category above to continue</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      <button 
                        onClick={() => selectSubsection('foundItems')}
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-900"
                      >
                        <Package size={24} className="mx-auto mb-2" />
                        Browse Found Items
                      </button>
                      <button 
                        onClick={() => selectSubsection('myListings')}
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-900"
                      >
                        <Clipboard size={24} className="mx-auto mb-2" />
                        View My Listings
                      </button>
                      <button 
                        onClick={() => selectSubsection('myRequests')}
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-900"
                      >
                        <Clock size={24} className="mx-auto mb-2" />
                        Check My Requests
                      </button>
                      <button 
                        onClick={() => selectSubsection('postItem')}
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-900"
                      >
                        <Plus size={24} className="mx-auto mb-2" />
                        Post Found Item
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          
          {activeSection === 'canteen' && <CanteenComponent />}
          {activeSection === 'canteenorders' && <OrdersMangement setActiveSection={setActiveSection} />}
          {activeSection === 'studentorders' && <StudentManagement setActiveSection={setActiveSection} />}
        </main>
      </div>
    </div>
  );
};

export default PurpleDashboard;