import axios from 'axios';

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dria4xmog/image/upload';
const uploadPreset = 'anfzira7';

const uploadImageToCloudinary = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', uploadPreset);

  try {
    const res = await axios.post(cloudinaryUrl, formData);
    if (res.data && res.data.secure_url) {
      return { success: true, url: res.data.secure_url };
    } else {
      return {
        success: false,
        error:
          'No response from Cloudinary! Failed to upload image to Cloudinary',
      };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to upload image to Cloudinary' };
  }
};

export default uploadImageToCloudinary;
