import { IoDocumentAttachOutline, IoAddOutline } from "react-icons/io5";
import TabBody from "./TabBody";
import Card from "../../../../../../componant/elements/Card";
import { useRef, useState } from "react";
import { axiosInstance, url } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const DocumentsTab = ({ workItem, refetch }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  // Translation
  const { t } = useTranslation();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) =>
        [
          "application/pdf",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type) && file.size <= 5 * 1024 * 1024 // Limit file size to 5 MB
    );

    if (validFiles.length !== files.length) {
      return toast.error(
        t("DetailsWorkLine.line.tabs.docs.alerts", {
          returnObjects: true,
        })[0]
      );
    }
    if (files.length > 3) {
      return toast.error(
        t("DetailsWorkLine.line.tabs.docs.alerts", {
          returnObjects: true,
        })[1]
      );
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("documents", file);
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
      formData.delete("documents");
      toast.success(
        t("DetailsWorkLine.line.tabs.docs.success", { returnObjects: true })[0]
      );
    }
  };

  // Function to handle document download
  const handleDownloadDocument = async (documentName) => {
    try {
      // Fetch the document as a blob
      const response = await axiosInstance.get(
        `${url}/uploads/${documentName}`,
        {
          responseType: "blob", // Remove the manual CORS header
        }
      );

      // Check if the response is valid
      if (!response.data || response.status !== 200) {
        throw new Error("Failed to fetch the document.");
      }

      // Create a temporary link element
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", documentName); // Set the filename for the download
      document.body.appendChild(link);
      link.click(); // Trigger the download

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error(
        t("DetailsWorkLine.line.tabs.docs.alerts", {
          returnObjects: true,
        })[2]
      );
    }
  };

  return (
    <TabBody
      title={t("DetailsWorkLine.line.tabs.docs.text")}
      button={
        <div>
          <button
            className="flex items-center gap-2 text-blue-500"
            onClick={handleButtonClick}
          >
            <IoAddOutline size={24} />{" "}
            {t("DetailsWorkLine.line.tabs.docs.addButton")}
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
            accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
      }
    >
      {!isLoading ? (
        <div className="flex flex-col gap-2">
          {workItem?.workItemId?.documents?.length > 0 ? (
            workItem?.workItemId?.documents?.map((doc, key) => (
              <Card
                key={key}
                handleDelete={async () => {
                  setIsLoading(true);
                  let res = await axiosInstance.delete(
                    `/api/work/${workItem?.workItemId._id}/details?document=${doc._id}`
                  );
                  if (res.status === 204) {
                    refetch();
                    setIsLoading(false);
                    toast.success(
                      t("DetailsWorkLine.line.tabs.docs.success", {
                        returnObjects: true,
                      })[1]
                    );
                  }
                }}
                title={doc.title}
                subText={`${doc?.type?.split("/")[1].toUpperCase()}, ${Number(
                  doc.size / 1024 / 1024
                ).toFixed(2)} MB`}
                icon={<IoDocumentAttachOutline size={24} />}
                isLoading={isLoading}
                handleDownload={() => handleDownloadDocument(doc.title)} // Pass the download function
              />
            ))
          ) : (
            <p>{t("DetailsWorkLine.line.tabs.docs.noFoundMessage")}</p>
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
export default DocumentsTab;
