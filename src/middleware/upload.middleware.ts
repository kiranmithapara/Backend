import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinay";
// // storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "crm_uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  }),
});

// NEW 👇 file filter
// const fileFilter = (req: any, file: any, cb: any) => {
//   // image types
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

//   if (allowedTypes.includes(file.mimetype)) {
//     // file.mimetype == filye no type
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPG, JPEG, PNG images allowed"));
//   }
// };

export const upload = multer({
  storage,

  // NEW 👇 size limit
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },

  // NEW 👇 filter
//   fileFilter,
});
