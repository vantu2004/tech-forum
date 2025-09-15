// Import Cloudinary SDK (v2 API) và đặt tên là 'cloudinary'
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// buộc phải load lại env nếu ko sẽ lỗi ???
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
