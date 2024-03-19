import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: 'dkl9wgs72', 
  api_key: '631482486836488', 
  api_secret: 'fWmBil1WBtx0VKe2ys--DFd-Glw' 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return;
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: 'auto'
      });
      return response.secure_url;
  } catch (error) {
      fs.unlinkSync(localFilePath); 
      return null;
  }
};


export { uploadOnCloudinary }