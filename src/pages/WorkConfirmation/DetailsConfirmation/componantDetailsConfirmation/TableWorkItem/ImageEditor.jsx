import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../../axios/axios";
const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
const ImageEditor = ({ image, onSave, onCancel, refetch, oldImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);

    const formData = new FormData();
    formData.append("image", croppedImageBlob, "cropped-image.jpg");

    try {
      const response = await axiosInstance.put(
        `/api/images/${oldImage}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Image saved successfully");
        onSave(response.data.imageUrl);
        refetch();
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while uploading the image."
      );
    }
  };

  return (
    <>
      <div className="relative h-[80%]">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="flex h-[10%] justify-between mt-4">
        <button onClick={onCancel} className="text-red-500 text-lg">
          <IoClose size={24} />
        </button>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
        />
        <button onClick={handleSave} className="text-green-500 text-lg">
          <IoCheckmark size={24} />
        </button>
      </div>
    </>
  );
};

export default ImageEditor;
