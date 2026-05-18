import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const uploadfilecloudinary = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "e-commerce",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

      // buffer to stream
      stream.end(Buffer.from(file.buffer));
    });

    return result;

  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};