import { IoAddOutline } from "react-icons/io5";
import Card from "../../../../../../componant/elements/Card";
import TabBody from "./TabBody";
import { useState } from "react";

import { axiosInstance } from "../../../../../../axios/axios";
// import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../../componant/Loading";
import { useTranslation } from "react-i18next";
import QualityControlForm from "./QualityControlForm";
const QualityControlTab = ({ workItem, refetch }) => {
  // Translation
  const { t } = useTranslation();
  const [isQCPointForm, setIsQCPointForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TabBody
      title={
        <h3 className="lead">{t("DetailsWorkLine.line.tabs.quality.text")}</h3>
      }
      button={
        <button
          onClick={() => setIsQCPointForm(true)}
          className="flex items-center gap-2 text-blue-500">
          <IoAddOutline size={24} />{" "}
          {t("DetailsWorkLine.line.tabs.quality.addButton")}
        </button>
      }>
      <div className="flex flex-col gap-4">
        {!isLoading ? (
          workItem.workItemId?.QC_Point?.length > 0 ? (
            workItem.workItemId?.QC_Point?.map((QC_Point) => (
              <Card
                handleDelete={async () => {
                  setIsLoading(true);
                  let res = await axiosInstance.delete(
                    `/api/work/${workItem?.workItemId._id}/details?qcPointId=${QC_Point._id}`
                  );
                  if (res.status === 204) {
                    refetch();
                    setIsLoading(false);
                  }
                }}
                key={QC_Point._id}
                title={QC_Point.title}
                date={QC_Point.date}
                type={QC_Point.passed && "Passed"}
                isLoading={isLoading}
              />
            ))
          ) : (
            <p>{t("DetailsWorkLine.line.tabs.quality.noFoundMessage")}</p>
          )
        ) : (
          <div className="flex items-center justify-center h-44">
            <Loading />
          </div>
        )}
      </div>
      {/* Form */}
      {isQCPointForm && (
        <QualityControlForm
          isLoading={isLoading}
          setIsQCPointForm={setIsQCPointForm}
          setIsLoading={setIsLoading}
          workItem={workItem}
        />
      )}
    </TabBody>
  );
};
export default QualityControlTab;
