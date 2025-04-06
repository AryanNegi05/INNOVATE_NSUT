require("dotenv").config();  // Load environment variables
const { GoogleGenAI } = require('@google/genai');  // Use require() for CommonJS
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const Dish = require('../models/Menu'); // Assuming your model is in models/Dish.js

// Function to fetch today's menu with calorie information
// async function getTodayMenu() {
//   try {
//     // Get current date in YYYY-MM-DD format
//     const today = new Date().toISOString().split('T')[0];
    
//     // Fetch dishes for today
//     const todayMenu = await Dish.find({ date: today });

//     // Process the menu with calorie information
//     const menuData = todayMenu.map(dish => ({
//       name: dish.dishName,
//       calories: dish.calories,
//       price: dish.price,  // If applicable
//       description: dish.description  // If applicable
//     }));
//     console.log('Today\'s menu:', menuData);  // Log the menu data for debugging
//     return menuData;
//   } catch (error) {
//     console.error('Error fetching today\'s menu:', error);
//     throw new Error('Failed to fetch today\'s menu');
//   }
// }

async function getTodayMenu() {
  try {
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    const todayMenu = await Dish.find({ date: today });
    
    console.log('Today\'s menu:', todayMenu);  // Log the menu data for debugging
    return todayMenu;
  } catch (error) {
    return {}
  }
};

// Function to send the user's prompt along with today's menu to Gemini for analysis
async function sendToGemini(menu, userPrompt) {
  try {
    // Create the analysis prompt including the menu and user prompt
    const analysisPrompt = `
      The following is the menu for today with calories for each dish:
      ${JSON.stringify(menu)}
      
      Based on the user prompt: "${userPrompt}", 
      suggest which dishes should be recommended to the user and which ones to avoid. Consider the calorie content and any trends.
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

// Main function to handle requests, generate food suggestions, and analyze menu
async function Gemini2(req, res) {
  try {
    // Get user input from the request (e.g., dietary preferences, food allergies, etc.)
    console.log(req.body);
    const userPrompt = req.body.prompt || '';  // Get user prompt from the request body
    console.log("user",userPrompt);
    // Fetch today's menu
    const todayMenu = await getTodayMenu();

    // Send today's menu and user prompt to Gemini for analysis
    const aiResponse = await sendToGemini(todayMenu, userPrompt);

    // Return the generated analysis from Gemini
    res.json({ analysis: aiResponse });
  } catch (error) {
    console.error('Error in Gemini function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { Gemini2 };