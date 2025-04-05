require("dotenv").config();  // Load environment variables
const mongoose = require('mongoose');
const { GoogleGenAI } = require('@google/genai');  // Use require() for CommonJS
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const { CanteenOrder } = require('../Models/Orders');  // Importing the canteen order model

// Function to fetch transaction history for the current month
async function getTransactionHistory(month) {
  try {
    // Query for transactions within the current month using placedAt field
    const transactions = await CanteenOrder.find({
      placedAt: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31T23:59:59`) }  // Date range for the current month
    });

    // Process transactions into a format suitable for Gemini model
    const transactionData = transactions.map(order => {
      return {
        userId: order.userId,  // Reference to the user who placed the order
        items: order.dishes.map(dish => `${dish.dishName} (Qty: ${dish.quantity})`),  // Combine dish name and quantity
        totalAmount: order.totalAmount,  // Total order amount
        status: order.status,  // Order status (pending, completed, cancelled)
        placedAt: order.placedAt  // Order date
      };
    });

    console.log('Transaction history:', transactionData);  // Log the transaction data for debugging

    return transactionData;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw new Error('Failed to fetch transaction history');
  }
}

// Function to send transaction history to Gemini for analysis
async function sendToGemini(transactionHistory) {
  try {
    const analysisPrompt = `
      Analyze the following transaction data from the food ordering system. 
      Suggest which dishes should be prepared tomorrow based on trends and avoid food wastage.
      
      Transaction History: ${JSON.stringify(transactionHistory)}
    `;

    // Call Gemini API to generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: analysisPrompt,
    });

    return response.text;  // Return the AI analysis result
  } catch (error) {
    console.error('Error calling Gemini:', error);
    throw new Error('Failed to generate analysis from Gemini');
  }
}

// Main function to handle requests and generate dish suggestions
async function Gemini(req, res) {
  try {
    // Get the current month in YYYY-MM format
    const currentMonth = new Date().toISOString().slice(0, 7);  // Get current month as YYYY-MM
    const transactionHistory = await getTransactionHistory(currentMonth);

    // Send transaction data to Gemini for analysis
    const aiResponse = await sendToGemini(transactionHistory);

    // Return the generated analysis from Gemini
    res.json({ analysis: aiResponse });
  } catch (error) {
    console.error('Error in Gemini function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { Gemini };