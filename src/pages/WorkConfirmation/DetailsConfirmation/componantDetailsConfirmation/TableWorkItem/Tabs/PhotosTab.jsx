import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import TabBody from "./TabBody";
import { useRef, useState, useCallback } from "react";
import { axiosInstance, url } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import { IoClose, IoCheckmark } from "react-icons/io5";
import ImageEditor from "../ImageEditor";
import Tabs from "../../../../../../componant/layout/Tabs";
import ColTabs from "../../../../../../componant/layout/ColTabs";
import TasksTab from "./TasksTab";
import CommentsTab from "./ImageTabs/CommentsTab";

const PhotosTab = ({ workItem, refetch, setLineDetails }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openView, setOpenView] = useState({ open: false, image: "" });
  const [isEditing, setIsEditing] = useState({
    filename: "",
    id: "",
    isActive: false,
  });
  // Translation
  const { t } = useTranslation();
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      return toast.error(
        t("DetailsWorkLine.line.tabs.photos.alerts", { returnObjects: true })[0]
      );
    }
    if (files.length > 5) {
      return toast.error(
        t("DetailsWorkLine.line.tabs.photos.alerts", { returnObjects: true })[1]
      );
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    setIsLoading(true);
    try {
      let res = await axiosInstance.post(
        `/api/work/${workItem?.workItemId._id}/details`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.statusText === "OK") {
        refetch();
        toast.success(
          t("DetailsWorkLine.line.tabs.photos.success", {
            returnObjects: true,
          })[0]
        );
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء رفع الصورة.");
    } finally {
      setIsLoading(false);
      event.target.value = "";
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
      toast.success(
        t("DetailsWorkLine.line.tabs.photos.success", {
          returnObjects: true,
        })[1]
      );
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
      toast.error(
        t("DetailsWorkLine.line.tabs.photos.alerts", { returnObjects: true })[2]
      );
    }
  };
  const tabData = [
    {
      title: "Crop Image",
      component: (
        <div className="flex-grow">
          <ImageEditor
            image={`${url}/uploads/${isEditing.filename}`}
            oldImage={isEditing.id}
            onSave={() => {
              setIsEditing({ isActive: false });
            }}
            workItem={workItem}
            refetch={refetch}
            onCancel={() => setIsEditing({ isActive: false })}
          />
        </div>
      ),
    },
    {
      title: "Add Task",
      component: (
        <TasksTab
          workItem={workItem}
          refetch={refetch}
          imageId={isEditing.id}
        />
      ),
    },
    {
      title: "Add Comment",
      component: (
        <CommentsTab
          workItem={workItem}
          refetch={refetch}
          imageId={isEditing.id}
        />
      ),
    },
  ];
  return (
    <TabBody
      title={t("DetailsWorkLine.line.tabs.photos.text")}
      button={
        <div>
          <button
            className={`flex items-center gap-2 text-blue-500 ${
              isLoading && "cursor-not-allowed"
            }`}
            onClick={handleButtonClick}
            disabled={isLoading}>
            <IoCloudUploadOutline size={24} />{" "}
            {t("DetailsWorkLine.line.tabs.photos.addButton")}
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
      }>
      {!isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workItem?.workItemId?.images.length > 0 ? (
            workItem?.workItemId?.images.map((image, key) => {
              return (
                <div
                  key={key}
                  className="overflow-hidden rounded-md flex items-center justify-center h-[13rem] relative">
                  <img
                    src={`${url}/uploads/${image.filename}`}
                    alt={`image-${image.filename}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="size-full absolute opacity-0 hover:opacity-100 transition-all flex flex-col items-stretch justify-center">
                    <button
                      className="bg-blue-300/60 flex items-center justify-center h-1/2"
                      onClick={() => handleOpenImage(image.filename)}>
                      <IoEyeOutline size={24} className="text-blue-900" />
                    </button>
                    <button
                      className="bg-yellow-300/60 flex items-center justify-center h-1/2"
                      onClick={() =>
                        setIsEditing({
                          id: image._id,
                          filename: image.filename,
                          isActive: true,
                        })
                      }>
                      <IoPencilOutline size={24} className="text-yellow-900" />
                    </button>
                    <button
                      className="bg-green-300/60 flex items-center justify-center h-1/2"
                      onClick={() => handleDownloadImage(image.filename)}>
                      <IoDownloadOutline size={24} className="text-green-900" />
                    </button>
                    <button
                      className="bg-red-300/60 flex items-center justify-center h-1/2"
                      onClick={() => handleRemoveImage(image._id)}>
                      <IoTrashOutline size={24} className="text-red-900" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>{t("DetailsWorkLine.line.tabs.photos.noFoundMessage")}</p>
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
          onClick={() => setOpenView({ open: false, image: "" })}>
          <div className="bg-white w-[80vw] h-[60vh] rounded p-2 flex flex-col gap-2">
            <img
              src={`${url}/uploads/${openView?.image}`}
              alt={`image-${openView?.image}`}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
      {isEditing.isActive && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-20">
          <div className="bg-white md:rounded-md shadow-md w-full md:w-[80vw] h-fit md:h-[80vh] relative z-50  overflow-y-auto scrollbar">
            <div className="h-fit md:h-[5vh] flex items-center justify-between px-6 pb-4 pt-6">
              <button
                className="hover:text-black/80"
                onClick={() => {
                  setLineDetails(false);
                  setIsEditing(null);
                }}>
                <IoCloseOutline size={24} />
              </button>
              <h3 className="lead">Edit Image</h3>
            </div>
            <ColTabs items={tabData} />
          </div>
        </div>
      )}
    </TabBody>
  );
};
export default PhotosTab;
