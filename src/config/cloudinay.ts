import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  // ! nay lagavi to ts error apse ! lagavathi evu nakki thay ke aa value undifine nay ave

  api_key: process.env.CLOUDINARY_API_KEY!,

  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;
