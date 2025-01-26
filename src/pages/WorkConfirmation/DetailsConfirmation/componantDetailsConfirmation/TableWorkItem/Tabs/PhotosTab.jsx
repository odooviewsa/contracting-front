import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import TabBody from "./TabBody";
import { useRef, useState } from "react";
import { axiosInstance, url } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";

const PhotosTab = ({ workItem, workConfirmationId, refetch }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
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
      `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details`,
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
    }
  };
  const handleRemoveImage = async (image) => {
    setIsLoading(true);
    let res = await axiosInstance.delete(
      `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details?image=${image}`
    );
    if (res.status === 204) {
      refetch();
      setIsLoading(false);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {workItem?.images.length > 0 ? (
            workItem?.images.map((image, key) => {
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
                  <button
                    className="bg-red-400/40 size-full absolute flex items-center justify-center opacity-0 hover:opacity-100 transition-all"
                    onClick={() => handleRemoveImage(image)}
                  >
                    <IoTrashOutline size={24} className="text-red-800" />
                  </button>
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
    </TabBody>
  );
};
export default PhotosTab;
