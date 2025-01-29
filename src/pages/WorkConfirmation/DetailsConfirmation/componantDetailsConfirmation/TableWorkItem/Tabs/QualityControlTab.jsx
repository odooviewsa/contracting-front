import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import Card from "../../../../../../componant/elements/Card";
import TabBody from "./TabBody";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../../componant/elements/Button";
import { axiosInstance } from "../../../../../../axios/axios";
// import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../../componant/Loading";
import { useTranslation } from "react-i18next";
const QualityControlTab = ({ workItem, refetch }) => {
  // Translation
  const { t } = useTranslation();
  const [isQCPointForm, setIsQCPointForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    let res = await axiosInstance.put(
      `/api/work/${workItem?.workItemId._id}/details`,
      data
    );
    if (res.statusText === "OK") {
      refetch();
      setIsLoading(false);
      setIsQCPointForm(false);
      reset();
    }
  };
  return (
    <TabBody
      title={t("DetailsWorkLine.line.tabs.quality.text")}
      button={
        <button
          onClick={() => setIsQCPointForm(true)}
          className="flex items-center gap-2 text-blue-500"
        >
          <IoAddOutline size={24} />{" "}
          {t("DetailsWorkLine.line.tabs.quality.addButton")}
        </button>
      }
    >
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
        <div className="fixed top-0 left-0 bg-black/60 w-screen h-screen flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-1/2 h-fit rounded p-4 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="lead">
                {t("DetailsWorkLine.line.tabs.quality.form.formTitle")}
              </h3>
              <button className="cursor-pointer">
                <IoCloseOutline
                  size={18}
                  onClick={() => setIsQCPointForm(false)}
                />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                {t("DetailsWorkLine.line.tabs.quality.form.titleLabel")}
              </label>
              <input
                type="text"
                id={"title"}
                {...register("title", {
                  required: t(
                    "DetailsWorkLine.line.tabs.quality.form.titlePlaceholder"
                  ),
                })}
                placeholder={t(
                  "DetailsWorkLine.line.tabs.quality.form.titleMessage"
                )}
                className="border px-4 py-2"
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" id={"passed"} {...register("passed")} />
              <label htmlFor="passed">
                {t("DetailsWorkLine.line.tabs.quality.form.passedLabel")}
              </label>
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className={`flex items-center justify-center ${
                isLoading && "cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <Loading />
              ) : (
                t("DetailsWorkLine.line.tabs.quality.form.button")
              )}
            </Button>
          </form>
        </div>
      )}
    </TabBody>
  );
};
export default QualityControlTab;
