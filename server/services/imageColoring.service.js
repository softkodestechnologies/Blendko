const cloudinary = require('cloudinary').v2;
const axios = require('axios');

exports.recolorImage = async (imageUrl, color) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    
    const sanitizedColor = color.replace('#', '');

    const transformedUrl = cloudinary.image(uploadResponse.public_id, {
      transformation: [
        { effect: `gen_recolor:prompt_clothe;to-color_${sanitizedColor}` }
      ]
    });


    return transformedUrl;
  } catch (error) {
    throw new Error('Error transforming the image: ' + error.message);
  }
};

