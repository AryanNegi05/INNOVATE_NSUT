import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CanteenOrdersPage = ({setActiveSection}) => {
  const [orders, setOrders] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = statusFilter === 'all' 
        ? 'https://innovate-nsut.onrender.com/api/v1/canteen/orders' 
        : 'https://innovate-nsut.onrender.com/api/v1/canteen/orders?status=${statusFilter}';
      
      const response = await axios.get(url);

      // Check if the response data structure matches the expected format
      if (response.data && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        setOrders([]); // Ensure orders is set to an empty array in case of unexpected data structure
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      setLoading(false);
      console.error('Error fetching orders:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log("orderId",orderId);
      console.log("newStatus",newStatus);
      await axios.put(`https://innovate-nsut.onrender.com/api/v1/canteen/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      setError('Failed to update order status. Please try again.');
      console.error('Error updating order status:', err);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) return <div className="flex justify-center p-8">Loading orders...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Canteen Orders</h1>
        <div className="flex space-x-2">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button 
            onClick={fetchOrders}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded">
          No orders found with the selected filter.
        </div>
      ) : (
        <div className="overflow-x-auto">
  <table className="min-w-full bg-white border">
    <thead>
      <tr className="bg-gray-100">
        <th className="py-2 px-4 border">Order ID</th>
        {/* <th className="py-2 px-4 border">Customer</th> */}
        <th className="py-2 px-4 border">Dishes</th>
        <th className="py-2 px-4 border">Total Amount</th>
        <th className="py-2 px-4 border">Status</th>
        <th className="py-2 px-4 border">Placed At</th>
        <th className="py-2 px-4 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order._id} className="hover:bg-gray-50">
          <td className="py-2 px-4 border">{order._id.substring(0, 8)}...</td>
          <td className="py-2 px-4 border">
            <ul className="list-disc pl-5">
              {order.dishes.map((dish, index) => (
                <li key={index}>
                  {dish.dishName} x {dish.quantity} (${dish.price})
                </li>
              ))}
            </ul>
          </td>
          <td className="py-2 px-4 border">${order.totalAmount.toFixed(2)}</td>
          <td className="py-2 px-4 border">
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(order.status)}`}>
              {order.status}
            </span>
          </td>
          <td className="py-2 px-4 border">{formatDate(order.placedAt)}</td>
          <td className="py-2 px-4 border">
            {order.status === 'pending' ? (
              <div className="flex space-x-2">
                <button 
                  onClick={() => updateOrderStatus(order._id, 'completed')}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Complete
                </button>
                <button 
                  onClick={() => updateOrderStatus(order._id, 'cancelled')}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No actions available</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
          <button
          onClick={() => setActiveSection('canteen')}
          className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 mt-10"
        >
          See Menu
        </button>
    </div>
  );
};

export default CanteenOrdersPage;