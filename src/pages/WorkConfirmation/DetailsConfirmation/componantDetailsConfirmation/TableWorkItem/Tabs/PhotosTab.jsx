import {
  IoCloudUploadOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import TabBody from "./TabBody";
import { useRef, useState } from "react";
import { axiosInstance, url } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";

const PhotosTab = ({ workItem, refetch }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openView, setOpenView] = useState({ open: false, image: "" });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Handle multiple files
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      return alert(
        "Some files were not accepted. Only image files are allowed."
      );
    }
    if (files.length > 5) {
      return alert(
        "You can only upload a maximum of 5 files at a time. Please try again."
      );
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    setIsLoading(true);
    let res = await axiosInstance.put(
      `/api/work/${workItem?.workItemId._id}/details`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.statusText === "OK") {
      refetch();
      setIsLoading(false);
      formData.delete("images");
    }
  };

  const handleRemoveImage = async (image) => {
    setIsLoading(true);
    let res = await axiosInstance.delete(
      `/api/work/${workItem?.workItemId._id}/details?image=${image}`
    );
    if (res.status === 204) {
      refetch();
      setIsLoading(false);
    }
  };

  const handleOpenImage = (image) => setOpenView({ open: true, image });

  // Function to handle image download
  const handleDownloadImage = async (image) => {
    try {
      // Fetch the image as a blob
      const response = await axiosInstance.get(`${url}/uploads/${image}`, {
        responseType: "blob",
      });

      // Check if the response is valid
      if (!response.data || response.status !== 200) {
        throw new Error("Failed to fetch the image.");
      }

      // Create a temporary link element
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", image); // Set the filename for the download
      document.body.appendChild(link);
      link.click(); // Trigger the download

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download the image. Please try again.");
    }
  };

  return (
    <TabBody
      title="Site Photos"
      button={
        <div>
          <button
            className={`flex items-center gap-2 text-blue-500 ${
              isLoading && "cursor-not-allowed"
            }`}
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            <IoCloudUploadOutline size={24} /> Upload Photo
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
      }
    >
      {!isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workItem?.workItemId?.images.length > 0 ? (
            workItem?.workItemId?.images.map((image, key) => {
              return (
                <div
                  key={key}
                  className="overflow-hidden rounded-md flex items-center justify-center h-[13rem] relative"
                >
                  <img
                    src={`${url}/uploads/${image}`}
                    alt={`image-${image}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="size-full absolute opacity-0 hover:opacity-100 transition-all flex flex-col items-stretch justify-center">
                    <button
                      className="bg-blue-300/60 flex items-center justify-center h-1/2"
                      onClick={() => handleOpenImage(image)}
                    >
                      <IoEyeOutline size={24} className="text-blue-900" />
                    </button>
                    <button
                      className="bg-green-300/60 flex items-center justify-center h-1/2"
                      onClick={() => handleDownloadImage(image)}
                    >
                      <IoDownloadOutline size={24} className="text-green-900" />
                    </button>
                    <button
                      className="bg-red-300/60 flex items-center justify-center h-1/2"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <IoTrashOutline size={24} className="text-red-900" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No photos</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-44">
          <Loading />
        </div>
      )}
      {/* View Image */}
      {openView.open && (
        <div
          className="fixed top-0 left-0 bg-black/60 w-full h-full flex items-center justify-center"
          onClick={() => setOpenView({ open: false, image: "" })}
        >
          <div className="bg-white w-[80vw] h-[60vh] rounded p-2 flex flex-col gap-2">
            <img
              src={`${url}/uploads/${openView?.image}`}
              alt={`image-${openView?.image}`}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </TabBody>
  );
};
export default PhotosTab;
