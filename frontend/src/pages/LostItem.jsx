import React, { useState } from 'react';
import axios from 'axios';

const ReportFoundItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    landmark: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
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
    form.append('image', image); // Ensure this matches your multer `upload.fields([{ name: 'image' }])`

    try {
      const response = await axios.post(
        'https://innovate-nsut.onrender.com/api/v1/item/found-items', // Adjust URL as per your backend
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if using token-based auth
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Failed to report item.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Report Found Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={formData.landmark}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        /><br /><br />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ReportFoundItem;
