const { prisma } = require('../db');

// @desc    Get all lesions for the logged in user
// @route   GET /api/lesions
// @access  Private
const getLesions = async (req, res) => {
  try {
    const lesions = await prisma.lesion.findMany({
      where: { userId: req.user.id },
      include: { scanHistory: true }
    });
    // For backwards compatibility with Mongoose responses
    const formattedLesions = lesions.map(l => ({ ...l, _id: l.id }));
    res.json(formattedLesions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new lesion profile
// @route   POST /api/lesions
// @access  Private
const createLesion = async (req, res) => {
  try {
    const { name, bodyLocation, notes } = req.body;
    
    if (!name || !bodyLocation) {
      return res.status(400).json({ message: 'Please provide name and body location' });
    }

    const lesionData = {
      userId: req.user.id,
      name,
      bodyLocation,
      notes: notes || "",
      imagePath: req.body.imagePath || null,
      reminderDate: req.body.reminderDate ? new Date(req.body.reminderDate) : null,
    };

    if (req.body.initialScan) {
      lesionData.scanHistory = {
        create: {
          riskLevel: req.body.initialScan.riskLevel,
          confidence: req.body.initialScan.confidence,
          explanation: req.body.initialScan.explanation,
          recommendation: req.body.initialScan.recommendation,
          imagePath: req.body.initialScan.imagePath || null,
          date: req.body.initialScan.date ? new Date(req.body.initialScan.date) : new Date(),
        }
      };
      lesionData.latestRisk = req.body.initialScan.riskLevel;
      lesionData.lastScan = req.body.initialScan.date ? new Date(req.body.initialScan.date) : new Date();
      lesionData.firstDetected = req.body.initialScan.date ? new Date(req.body.initialScan.date) : new Date();
      // Use the scan's imagePath as the lesion's main image if not set
      if (!lesionData.imagePath && req.body.initialScan.imagePath) {
        lesionData.imagePath = req.body.initialScan.imagePath;
      }
    }

    const lesion = await prisma.lesion.create({
      data: lesionData,
      include: { scanHistory: true }
    });
    
    res.status(201).json({ ...lesion, _id: lesion.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a scan/analysis to a lesion
// @route   POST /api/lesions/:id/scans
// @access  Private
const addScanToLesion = async (req, res) => {
  try {
    const lesion = await prisma.lesion.findUnique({
      where: { id: req.params.id }
    });
    
    if (!lesion) return res.status(404).json({ message: 'Lesion not found' });
    if (lesion.userId !== req.user.id) return res.status(401).json({ message: 'User not authorized' });
    
    // In a real app, send the image to an AI python microservice or model here.
    // For now, generate the mock risk level.
    const riskLevels = ['low', 'medium', 'high'];
    const results = [
      {
        riskLevel: 'low',
        confidence: 0.88 + (Math.random() * 0.10),
        explanation: 'The lesion displays uniform pigmentation with well-defined, symmetrical borders. No irregular features or color variegation detected.',
        recommendation: 'Continue regular self-monitoring every 3 months. Apply broad-spectrum SPF 50+ sunscreen daily.',
      },
      {
        riskLevel: 'medium',
        confidence: 0.70 + (Math.random() * 0.15),
        explanation: 'Slight asymmetry observed in the lesion border. Mild color variation is present within the lesion boundary.',
        recommendation: 'Schedule a dermatologist appointment within the next 2–4 weeks for a professional evaluation.',
      },
      {
        riskLevel: 'high',
        confidence: 0.60 + (Math.random() * 0.20),
        explanation: 'Multiple irregular features detected: asymmetrical borders, heterogeneous coloring with dark regions. Consistant with higher-risk lesion patterns.',
        recommendation: '⚠️ Seek immediate medical attention. Contact a board-certified dermatologist as soon as possible.',
      }
    ];

    const randomIndex = Math.floor(Math.random() * results.length);
    const analysisResult = results[randomIndex];
    
    const newScan = {
      ...analysisResult,
      imagePath: req.file ? req.file.path : null
    };

    const scanEntry = await prisma.scanEntry.create({
      data: {
        lesionId: req.params.id,
        riskLevel: newScan.riskLevel,
        confidence: newScan.confidence,
        explanation: newScan.explanation,
        recommendation: newScan.recommendation,
        imagePath: newScan.imagePath,
      }
    });

    const updatedLesion = await prisma.lesion.update({
      where: { id: req.params.id },
      data: { 
        latestRisk: newScan.riskLevel, 
        lastScan: new Date() 
      },
      include: { scanHistory: true }
    });

    res.status(201).json({ lesion: { ...updatedLesion, _id: updatedLesion.id }, scan: scanEntry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLesion = async (req, res) => {
  try {
    const lesion = await prisma.lesion.findUnique({
      where: { id: req.params.id }
    });
    
    if (!lesion) {
      return res.status(404).json({ message: 'Lesion not found' });
    }
    
    if (lesion.userId !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.bodyLocation) updateData.bodyLocation = req.body.bodyLocation;
    if (req.body.notes !== undefined) updateData.notes = req.body.notes;
    if (req.body.imagePath) updateData.imagePath = req.body.imagePath;
    if (req.body.reminderDate !== undefined) updateData.reminderDate = req.body.reminderDate ? new Date(req.body.reminderDate) : null;
    
    // Replace scan history if provided (the mobile app sends the full array)
    if (req.body.scanHistory) {
      // First delete existing scans
      await prisma.scanEntry.deleteMany({
        where: { lesionId: req.params.id }
      });
      
      // Then create new ones
      updateData.scanHistory = {
        create: req.body.scanHistory.map(scan => ({
          riskLevel: scan.riskLevel,
          confidence: scan.confidence,
          explanation: scan.explanation,
          recommendation: scan.recommendation,
          imagePath: scan.imagePath,
          date: scan.date ? new Date(scan.date) : new Date()
        }))
      };

      if (req.body.scanHistory.length > 0) {
        const latest = req.body.scanHistory[req.body.scanHistory.length - 1];
        updateData.latestRisk = latest.riskLevel;
        updateData.lastScan = latest.date ? new Date(latest.date) : new Date();
      }
    }

    const updatedLesion = await prisma.lesion.update({
      where: { id: req.params.id },
      data: updateData,
      include: { scanHistory: true }
    });
    
    res.json({ ...updatedLesion, _id: updatedLesion.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLesions,
  createLesion,
  addScanToLesion,
  updateLesion,
};
