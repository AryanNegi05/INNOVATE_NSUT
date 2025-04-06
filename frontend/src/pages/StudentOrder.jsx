import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentOrder = ({setActiveSection}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [suggestionText, setSuggestionText] = useState(""); // State for the suggestion input
  const [suggestionResponse, setSuggestionResponse] = useState(""); // State to hold AI response

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/todaymenu");
        if (res.data.success) {
          setMenuItems(res.data.data);
          const initialQuantities = {};
          res.data.data.forEach((item) => {
            initialQuantities[item._id] = 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleQuantityChange = (itemId, value) => {
    const updated = {
      ...quantities,
      [itemId]: Math.max(1, parseInt(value) || 1),
    };
    setQuantities(updated);
  };

  const handlePlaceOrder = async (item) => {
    const quantity = quantities[item._id] || 1;
    console.log("Placing order for item:", item.name, "Quantity:", quantity);
    try {
      const orderPayload = {
        userId: localStorage.getItem("userId"),
        dishes: [
          {
            dishName: item.name,
            quantity: quantity,
            price: item.price,
          },
        ],
        totalAmount: item.price * quantity,
      };

      const res = await axios.post("https://innovate-nsut.onrender.com/api/v1/place-order", orderPayload);

      if (res.data.success) {
        alert("✅ Order placed successfully!");
      } else {
        alert("❌ Failed to place order.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("❌ Error placing order.");
    }
  };

  // Handle AI-based suggestions
  const handleSuggestionSubmit = async () => {
    try {
      const res = await axios.post("https://innovate-nsut.onrender.com/api/v1/aibasedsuggestion", {
        prompt: suggestionText, // Send the user's suggestion text to the API
      });
      if (res.data.analysis) {
        setSuggestionResponse(res.data.analysis); // Update the response state with the analysis
      } else {
        setSuggestionResponse("❌ No analysis available.");
      }
    } catch (err) {
      console.error("Error fetching suggestion:", err);
      setSuggestionResponse("❌ Error fetching suggestion.");
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading menu...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Full Menu</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            )}
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-700 mb-1">{item.description}</p>
            <p className="text-sm text-gray-500 mb-1">Category: {item.category}</p>
            <p className="text-sm mb-1">Price: ₹{item.price}</p>
            <p className="text-sm mb-1">Available: {item.quantityAvailable}</p>
            <p className="text-sm mb-1">Prep Time: {item.prepTime} min</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2 flex-wrap text-xs">
              {item.isVegetarian && (
                <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded">
                  Vegetarian
                </span>
              )}
              {item.isVegan && (
                <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                  Vegan
                </span>
              )}
              {item.isGlutenFree && (
                <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded">
                  Gluten Free
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantities[item._id] || 1}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            {/* Order Now Button */}
            <button
              onClick={() => handlePlaceOrder(item)}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/* Suggestion Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Get Dish Suggestions</h3>
        <textarea
          value={suggestionText}
          onChange={(e) => setSuggestionText(e.target.value)}
          placeholder="Enter your suggestion (e.g., Suggest vegetarian dishes with low calories)"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSuggestionSubmit}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Get Suggestions
        </button>

        {/* Display AI Response */}
        {suggestionResponse && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h4 className="font-semibold">AI Analysis and Recommendations:</h4>
            <pre className="whitespace-pre-wrap">{suggestionResponse}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOrder;