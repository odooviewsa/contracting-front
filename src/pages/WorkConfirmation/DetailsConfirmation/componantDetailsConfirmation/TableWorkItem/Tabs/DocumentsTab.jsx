import { IoDocumentAttachOutline, IoAddOutline } from "react-icons/io5";
import TabBody from "./TabBody";
import Card from "../../../../../../componant/elements/Card";
import { useRef } from "react";
import { axiosInstance } from "../../../../../../axios/axios";

const DocumentsTab = ({ workItem, workConfirmationId }) => {
  const fileInputRef = useRef(null);

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
      alert(
        "Some files were not accepted. Only PDF and Excel files under 5 MB are allowed."
      );
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("documents", file);
    });
    await axiosInstance.put(
      `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
      <div className="flex flex-col gap-2">
        {workItem?.documents?.length > 0 ? (
          workItem?.documents?.map((doc, key) => (
            <Card
              key={key}
              handleDelete={async () => {
                await axiosInstance.delete(
                  `/api/workConfirmation/workConfirmation/${workConfirmationId}/${workItem?.workItemId._id}/details?document=${doc._id}`
                );
              }}
              title={doc.title}
              subText={`${doc?.type?.split("/")[1].toUpperCase()}, ${Number(
                doc.size / 1024 / 1024
              ).toFixed(2)} MB`}
              icon={<IoDocumentAttachOutline size={24} />}
            />
          ))
        ) : (
          <p>No Documents</p>
        )}
      </div>
    </TabBody>
  );
};
export default DocumentsTab;
