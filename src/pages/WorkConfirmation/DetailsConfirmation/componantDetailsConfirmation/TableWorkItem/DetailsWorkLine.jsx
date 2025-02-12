import {
  IoCameraOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoDocumentOutline,
  IoTimeOutline,
  IoWarningOutline,
} from "react-icons/io5";
import DetailsWidget from "./DetailsWidget";
import Tabs from "../../../../../componant/layout/Tabs";
import ProgressAnalysisTab from "./Tabs/ProgressAnalysisTab";
import QualityControlTab from "./Tabs/QualityControlTab";
import PhotosTab from "./Tabs/PhotosTab";
import DocumentsTab from "./Tabs/DocumentsTab";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import TasksTab from "./Tabs/TasksTab";

const DetailsWorkLine = ({
  workItem,
  workConfirmation,
  setLineDetails,
  refetch,
}) => {
  // Translation
  const { t } = useTranslation();
  const currentWorkItem = workConfirmation?.workItems.filter(
    (item) => item._id === workItem
  )[0];
  const tabs = [
    {
      title: t("DetailsWorkLine.line.tabs.progress.title"),
      content: (
        <ProgressAnalysisTab
          workConfirmation={workConfirmation}
          workItem={currentWorkItem}
          text={t("DetailsWorkLine.line.tabs.progress.text")}
        />
      ),
    },
    {
      title: t("DetailsWorkLine.line.tabs.quality.title"),
      content: (
        <QualityControlTab workItem={currentWorkItem} refetch={refetch} />
      ),
    },
    {
      title: t("DetailsWorkLine.line.tabs.photos.title"),
      content: <PhotosTab workItem={currentWorkItem} refetch={refetch} setLineDetails={setLineDetails}/>,
    },
    {
      title: t("DetailsWorkLine.line.tabs.docs.title"),
      content: <DocumentsTab workItem={currentWorkItem} refetch={refetch} />,
    },
    {
      // t("DetailsWorkLine.line.tabs.tasks.title")
      title: "Tasks",
      content: <TasksTab workItem={currentWorkItem} refetch={refetch} />,
    },
  ];
  const widgets = [
    {
      icon: <IoCheckmarkCircleOutline size={24} />,
      iconColor: "text-green-500",
      text: t("DetailsWorkLine.line.widgets.qcPoints"),
      value: currentWorkItem?.workItemId?.QC_Point.length,
    },
    {
      icon: <IoWarningOutline size={24} />,
      iconColor: "text-red-500",
      text: t("DetailsWorkLine.line.widgets.ncrs"),
      value: "1",
    },
    {
      icon: <IoCameraOutline size={24} />,
      iconColor: "text-blue-500",
      text: t("DetailsWorkLine.line.widgets.photos"),
      value: currentWorkItem?.workItemId?.images.length,
    },
    {
      icon: <IoDocumentOutline size={24} />,
      iconColor: "text-purple-500",
      text: t("DetailsWorkLine.line.widgets.documents"),
      value: currentWorkItem?.workItemId?.documents.length,
    },
  ];
  return (
    <div className="bg-black/60 fixed flex items-center justify-center top-0 left-0 h-screen w-full z-40">
      <div className="py-4 w-[80vw] h-[80vh] bg-white rounded flex flex-col gap-8 p-8 lg:p-10 overflow-y-auto scrollbar relative z-50">
        <div className="absolute top-4 rtl:right-4 ltr:left-4 cursor-pointer">
          <IoCloseOutline onClick={() => setLineDetails(null)} size={18} />
        </div>
        {currentWorkItem?.isCalculated ? (
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-y-2 md:items-center">
              <h3 className="lead">{t("DetailsWorkLine.line.title")}</h3>
              <div className="flex gap-4">
                <p>
                  <span className="text-blue-500 font-medium">
                    {(
                      (currentWorkItem?.totalQuantity /
                        currentWorkItem?.workItemId.workDetails
                          .assignedQuantity) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </p>
              </div>
            </div>
            <div className="relative w-full h-2.5  overflow-hidden rounded-3xl bg-gray-100">
              <div
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${
                    (currentWorkItem?.totalQuantity /
                      currentWorkItem?.workItemId.workDetails
                        .assignedQuantity) *
                    100
                  }%`,
                }}
                className="flex h-full items-center justify-center bg-green-500  text-white rounded-3xl"></div>
            </div>
          </div>
        ) : (
          <Alert severity="warning">
            {t("DetailsWorkLine.line.alertMessage")}
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {widgets.map((widget, key) => (
            <DetailsWidget key={key} widget={widget} />
          ))}
        </div>
        <p className="textBlur flex gap-2 items-center">
          <IoTimeOutline size={18} />
          {t("DetailsWorkLine.line.lastUpdate", {
            date: `${new Date(workConfirmation?.updatedAt).getFullYear()}-${
              new Date(workConfirmation?.updatedAt).getMonth() + 1
            }-${String(
              new Date(workConfirmation?.updatedAt).getDate()
            ).padStart(2, "0")}`,
          })}
        </p>
        <Tabs items={tabs} />
      </div>
    </div>
  );
};
export default DetailsWorkLine;
