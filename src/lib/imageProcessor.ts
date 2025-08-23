// src/lib/imageProcessor.ts

import imageCompression from 'browser-image-compression';

// These are our TARGETS for the final uploaded image.
const options = {
  maxSizeMB: 1,          // Target size: 1 MB
  maxWidthOrHeight: 1280,  // Target resolution: 1280px on the longest side
  useWebWorker: true,    // Use a web worker to avoid freezing the UI
};

export async function processImage(file: File): Promise<File> {
  console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

  // If the file is already small enough, just return it.
  if (file.size <= options.maxSizeMB * 1024 * 1024) {
    console.log('File is already small enough, skipping compression.');
    return file;
  }

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    // If compression fails for any reason, return the original file.
    // Our Zod schema will still catch it if it's over the hard limit.
    return file;
  }
}