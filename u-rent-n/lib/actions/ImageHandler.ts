"use server";
import { v2 as cloudinary } from "cloudinary";

// Configure with environment variables
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.Api_key,
  api_secret: process.env.Api_secret,
});

export async function uploadImage(file: File) {
  try {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Direct upload without base64 conversion
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        folder: "nextjs_uploads",
        resource_type: "auto",
      }
    );

    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Image upload failed");
  }
}