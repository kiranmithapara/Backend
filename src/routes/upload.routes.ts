import { Router } from "express";

import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/",

  // NEW 👇 single file upload
  upload.single("image"),

  (req, res) => {
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      imageUel: req.file?.path,
      // uploaded file info
      //   file: req.file,
    });
  },
);

export default router;
