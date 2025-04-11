"use server";

import type { CloudinaryImage } from "../models/cloudinary.model";
import { env } from "@/shared/config/env.config";
import { v2 } from "cloudinary";

type Image = {
  url: string;
  productId: string;
};

v2.config({
  cloud_name: env.cloudinaryName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinarySecret,
  secure: true,
});

export async function uploadImages(files: FileList, productId: string): Promise<Image[]> {
  const imagesBuffer: Buffer<ArrayBuffer>[] = [];
  const fileImages = Array.from(files);
  for (const file of fileImages) {
    const imageBuffer = await file.arrayBuffer();
    imagesBuffer.push(Buffer.from(imageBuffer));
  }

  const imagesPromises = imagesBuffer.map(
    (imgBuffer) =>
      new Promise((resolve, reject) => {
        v2.uploader
          .upload_stream({ folder: "e-shop" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(imgBuffer);
      })
  );

  const cloudinaryImages: CloudinaryImage[] = [];
  const results = await Promise.allSettled(imagesPromises);
  results.forEach((response) => {
    if (response.status === "fulfilled") cloudinaryImages.push(response.value as CloudinaryImage);
  });

  const images = cloudinaryImages.map((image) => ({ url: image.secure_url, productId }));
  return images;
}

export async function removeImageFromCloudinary(imageUrl: string): Promise<void> {
  const imageName = imageUrl.split("/").at(-1);
  const imageFolder = imageUrl.split("/").at(-2);
  const imageNameWithoutExtension = imageName?.split(".")[0];

  if (!imageFolder || !imageNameWithoutExtension) throw new Error("No se envió imagen");

  const public_id = `${imageFolder}/${imageNameWithoutExtension}`;
  await v2.uploader.destroy(public_id, { resource_type: "image" });
}
