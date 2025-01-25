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

const widgets = [
  {
    icon: <IoCheckmarkCircleOutline size={24} />,
    iconColor: "text-green-500",
    text: "QC Points",
    value: "5",
  },
  {
    icon: <IoWarningOutline size={24} />,
    iconColor: "text-red-500",
    text: "NCRs",
    value: "1",
  },
  {
    icon: <IoCameraOutline size={24} />,
    iconColor: "text-blue-500",
    text: "Photos",
    value: "12",
  },
  {
    icon: <IoDocumentOutline size={24} />,
    iconColor: "text-purple-500",
    text: "Documents",
    value: "3",
  },
];
const DetailsWorkLine = ({ workItem, workConfirmation, setLineDetails }) => {
  const tabs = [
    {
      title: "Progress Analysis",
      content: (
        <ProgressAnalysisTab
          workConfirmationId={workConfirmation._id}
          workItem={workItem}
        />
      ),
    },
    {
      title: "Quality Control",
      content: (
        <QualityControlTab
          workConfirmationId={workConfirmation._id}
          workItem={workItem}
        />
      ),
    },
    {
      title: "Photos",
      content: (
        <PhotosTab
          workConfirmationId={workConfirmation._id}
          workItem={workItem}
        />
      ),
    },
    {
      title: "Docs",
      content: (
        <DocumentsTab
          workConfirmationId={workConfirmation._id}
          workItem={workItem}
        />
      ),
    },
  ];
  return (
    <div className="bg-black/60 fixed flex items-center justify-center top-0 left-0 h-screen w-full z-50">
      <div className="py-4 h-[80vh] bg-white rounded flex flex-col gap-8 p-8 lg:p-10 overflow-y-auto scrollbar relative">
        <div className="absolute top-4 rtl:right-4 ltr:left-4 cursor-pointer">
          <IoCloseOutline onClick={() => setLineDetails(null)} size={18} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-y-2 md:items-center">
            <h3 className="lead">Overall Progress</h3>
            <div className="flex gap-4">
              <p className="textBlur">
                Efficiency:{" "}
                <span className="text-yellow-500 font-medium">86.5%</span>
              </p>
              <p>
                <span className="text-blue-500 font-medium">
                  {(workItem?.totalQuantity / workItem?.currentQuantity) * 100}%
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
                  (workItem?.totalQuantity / workItem?.currentQuantity) * 100
                }%`,
              }}
              className="flex h-full items-center justify-center bg-primaryColor  text-white rounded-3xl"
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {widgets.map((widget, key) => (
            <DetailsWidget key={key} widget={widget} />
          ))}
        </div>
        <p className="textBlur flex gap-2 items-center">
          <IoTimeOutline size={18} />
          Last updated: 2024-01-20
        </p>
        <Tabs items={tabs} />
      </div>
    </div>
  );
};
export default DetailsWorkLine;
