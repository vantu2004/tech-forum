// Sử dụng multer để xử lý formdata
import multer from "multer";

//Lưu dữ liệu vào RAM, nằm trong req.file.buffer
const upload = multer({ storage: multer.memoryStorage() }); 

export default upload;
