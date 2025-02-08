import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import Input from "../../../componant/elements/Input";
import Button from "../../../componant/elements/Button";
import { useForm } from "react-hook-form";
import Loading from "../../../componant/Loading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReportBusinessGuaranteeForm = () => {
  // Translations
  const { t } = useTranslation();
  const [optionsProjects, setOptionProjects] = useState([]);
  const [optionsContracts, setOptionContracts] = useState([]);
  const [showContractInput, setShowContractInput] = useState(false);
  const navigate = useNavigate();
  // Add the form to display report options and filters
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/api/projects");
        return response.data.projects;
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
  });
  // Form handling
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = (data) => {
    navigate(`businessesGuarantee/${data.contract}`, {
      state: {
        projectName: projects.filter(
          (project) => project._id === data.project
        )[0].projectName,
      },
    });
  };
  const projectValue = watch("project");
  const contractValue = watch("contract");
  useEffect(() => {
    // Show the contract
    if (projectValue) {
      setShowContractInput(true);
      // filter the contract
      const contracts = projects.find(
        (project) => project._id === projectValue
      )?.contracts;
      const options =
        contracts?.length > 0
          ? contracts?.map((item, i) => ({
              value: item._id,
              text: item.code,
            }))
          : [];
      setOptionContracts(options);
    } else {
      setShowContractInput(false);
    }
  }, [projectValue]);
  if (error) {
    return <div>Error fetching projects</div>;
  }
  useEffect(() => {
    const options =
      projects?.length > 0
        ? projects?.map((item, i) => ({
            value: item._id,
            text: item.projectName,
          }))
        : [];
    setOptionProjects(options);
  }, [projects]);
  return (
    <form
      className="bg-slate-100 p-4 border rounded-lg flex flex-col gap-6 items-start h-fit w-full md:w-[24rem] mx-auto mt-8 md:mt-16"
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center text-2xl lg:text-4xl font-bold text-primaryColor w-full mb-2 lg:mb-4">
        {t("ReportPage.businessGuarantee.title")}
      </h1>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {!isLoading ? (
          <>
            <Input
              id="project"
              className="bg-slate-200"
              errors={errors}
              label={t("ReportPage.businessGuarantee.projectsLabel")}
              options={[
                {
                  value: "",
                  text: t("ReportPage.businessGuarantee.selectProject"),
                  asDefault: true,
                },
                ...optionsProjects,
              ]}
              register={register("project", { required: true })}
              errorMessage={t(
                "ReportPage.businessGuarantee.projectErrorMessage"
              )}
            />
            {showContractInput && (
              <Input
                id="contract"
                className="bg-slate-200"
                errors={errors}
                label={t("ReportPage.businessGuarantee.contractsLabel")}
                options={[
                  {
                    value: "",
                    text: t("ReportPage.businessGuarantee.selectContract"),
                    asDefault: true,
                  },
                  ...optionsContracts,
                ]}
                register={register("contract", { required: true })}
                errorMessage={t(
                  "ReportPage.businessGuarantee.contractErrorMessage"
                )}
              />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Button type="submit" disabled={!contractValue}>{t("ReportPage.saveButton")}</Button>
    </form>
  );
};

export default ReportBusinessGuaranteeForm;
