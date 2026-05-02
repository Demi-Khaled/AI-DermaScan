const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// @desc    Analyze an image using the PyTorch AI microservice
// @route   POST /api/analyze
// @access  Private
const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded.' });
    }

    const imagePath = req.file.path;
    
    // Prepare the form data to send to the AI service
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    // Define the AI service URL (fallback to localhost:5000 if not in Docker)
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000/predict';

    try {
      // Call the Python AI service
      const response = await axios.post(aiServiceUrl, form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      const analysisResult = response.data;

      // Pass back the image server URL so the frontend can save it to a Lesion later
      const responsePayload = {
          ...analysisResult,
          imagePath: imagePath
      };

      res.status(200).json(responsePayload);
    } catch (aiError) {
      console.error("AI Service Error:", aiError.message);
      res.status(502).json({ 
        message: 'Failed to communicate with AI analysis service.',
        details: aiError.message
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  analyzeImage
};
