import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({
  cloud_name: process.env.cloud_name,
  api_key: process.env.Api_key,
  api_secret: process.env.Api_secret,
  secure: true,
});

export default cloudinary;