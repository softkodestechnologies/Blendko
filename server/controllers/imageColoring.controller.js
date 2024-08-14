const imageColoringService = require('../services/imageColoring.service');

exports.transformImageColor = async (req, res, next) => {
  try {
    const { imageUrl, color } = req.body;
    const transformedImageUrl = await imageColoringService.recolorImage(imageUrl, color);
    res.status(200).json({
      success: true,
      data: transformedImageUrl,
    });
  } catch (error) {
    console.error('Error in transformImageColor:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};