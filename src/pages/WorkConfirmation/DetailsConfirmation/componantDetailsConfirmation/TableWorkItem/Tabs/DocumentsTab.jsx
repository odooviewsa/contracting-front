import { IoDocumentAttachOutline, IoAddOutline } from "react-icons/io5";
import TabBody from "./TabBody";
import Card from "../../../../../../componant/elements/Card";
import { useRef, useState } from "react";
import { axiosInstance } from "../../../../../../axios/axios";
import Loading from "../../../../../../componant/Loading";

const DocumentsTab = ({ workItem, workConfirmationId, refetch }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden input
  };
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Handle multiple files
    const validFiles = files.filter(
      (file) =>
        [
          "application/pdf",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type) && file.size <= 5 * 1024 * 1024 // Limit file size to 5 MB
    );

    if (validFiles.length !== files.length) {
      return alert(
        "Some files were not accepted. Only PDF and Excel files under 5 MB are allowed."
      );
    }
    if (files.length > 3) {
      return alert(
        "You can only upload a maximum of 3 files at a time. Please try again."
      );
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("documents", file);
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
  return (
    <TabBody
      title="Documents"
      button={
        <div>
          <button
            className="flex items-center gap-2 text-blue-500"
            onClick={handleButtonClick}
          >
            <IoAddOutline size={24} /> Add Document
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
          {workItem?.documents?.length > 0 ? (
            workItem?.documents?.map((doc, key) => (
              <Card
                key={key}
                handleDelete={async () => {
                  setIsLoading(true);
                  let res = await axiosInstance.delete(
                    `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details?document=${doc._id}`
                  );
                  if (res.status === 204) {
                    refetch();
                    setIsLoading(false);
                  }
                }}
                title={doc.title}
                subText={`${doc?.type?.split("/")[1].toUpperCase()}, ${Number(
                  doc.size / 1024 / 1024
                ).toFixed(2)} MB`}
                icon={<IoDocumentAttachOutline size={24} />}
                isLoading={isLoading}
              />
            ))
          ) : (
            <p>No Documents</p>
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
