"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import imageCompression from "browser-image-compression";

const ImageCompressor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(5);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [compressedPreview, setCompressedPreview] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setOriginalPreview(URL.createObjectURL(file));
      await compressImage(file);
    }
  };

  const compressImage = async (imageFile) => {
    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: compressionLevel / 10, // Convert slider value to MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImage(compressedFile);
      setCompressedPreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.error("Error compressing image:", error);
    }
    setIsCompressing(false);
  };

  const handleCompressionLevelChange = async (value) => {
    setCompressionLevel(value[0]);
    if (selectedImage) {
      await compressImage(selectedImage);
    }
  };

  const handleDownload = () => {
    if (compressedImage) {
      const url = URL.createObjectURL(compressedImage);
      const link = document.createElement("a");
      link.href = url;
      link.download = `compressed-${compressedImage.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-6">
            {/* Upload Area */}
            <label
              className={cn(
                "w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer",
                "hover:border-blue-500 transition-colors",
                "bg-gray-50"
              )}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="text-center">
                <p className="text-gray-600">
                  {selectedImage
                    ? `Selected: ${selectedImage.name}`
                    : "Click to upload image"}
                </p>
                {selectedImage && (
                  <p className="text-sm text-gray-500">
                    Original size:{" "}
                    {(selectedImage.size / 1024 / 1024).toFixed(2)}
                    MB
                  </p>
                )}
              </div>
            </label>

            {/* Compression Level Slider */}
            {selectedImage && (
              <div className="w-full space-y-2">
                <label className="text-sm text-gray-600">
                  Compression Level: {compressionLevel}/10
                </label>
                <Slider
                  value={[compressionLevel]}
                  onValueChange={handleCompressionLevelChange}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            )}

            {/* Image Previews */}
            {selectedImage && compressedImage && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Preview */}
                <div className="space-y-2">
                  <h3 className="text-sm   font-medium text-gray-700">
                    Original
                  </h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="object-contain w-full h-full"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                      {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>

                {/* Compressed Preview */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Compressed
                  </h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={compressedPreview}
                      alt="Compressed"
                      className="object-contain w-full h-full"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                      {(compressedImage.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Download Button */}
            {compressedImage && (
              <Button
                onClick={handleDownload}
                className="w-full md:w-auto"
                variant="default"
                disabled={isCompressing}
              >
                {isCompressing ? "Compressing..." : "Download Compressed Image"}
              </Button>
            )}

            {isCompressing && (
              <p className="text-sm text-blue-500">Compressing image...</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImageCompressor;
