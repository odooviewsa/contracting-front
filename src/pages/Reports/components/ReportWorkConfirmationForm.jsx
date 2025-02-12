import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../axios/axios";
import Input from "../../../componant/elements/Input";
import Button from "../../../componant/elements/Button";
import { useForm } from "react-hook-form";
import Loading from "../../../componant/Loading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReportWorkConfirmationForm = () => {
  // Translations
  const { t } = useTranslation();
  const [optionsProjects, setOptionProjects] = useState([]);
  const [optionsContracts, setOptionContracts] = useState([]);
  const [optionWorksConfirmation, setOptionWorksConfirmation] = useState([]);
  const [showContractInput, setShowContractInput] = useState(false);
  const [showWorksConfirmationInput, setShowWorksConfirmationInput] =
    useState(false);
  const navigate = useNavigate();
  // Form handling
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

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = (data) => {
    let contracts = projects.filter(
      (project) => project._id === data.project
    )[0].contracts;
    navigate(`workConfirmation/${data.contract}/${data.workConfirmation}`, {
      state: {
        contract: contracts.filter(
          (contract) => contract._id === data.contract
        )[0],
      },
    });
  };
  const projectValue = watch("project");
  const contractValue = watch("contract");
  const workConfirmationValue = watch("workConfirmation");
  // Add the form to display report options and filters
  const getWorkConfirmation = async (contractId) => {
    try {
      const response = await axiosInstance.get(
        `/api/workConfirmation/${contractId}/contract`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };
  const { isLoading: workConfirmationLoading } =
    useQuery({
      queryKey: ["getWorkConfirmation", contractValue],
      queryFn: () => getWorkConfirmation(contractValue),
      enabled: !!contractValue,
    });
  // Contract Options
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
      setShowWorksConfirmationInput(false);
    }
  }, [projectValue, contractValue]);
  // WorkConfirmation Options
  useEffect(() => {
    if (projectValue && contractValue) {
      getWorkConfirmation(contractValue).then((data) => {
        const options = data?.length
          ? data.map((item, i) => ({
              value: item._id,
              text: `${item?.contractId?.code} - ${i + 1}`,
            }))
          : [];
        setOptionWorksConfirmation(options);
        setShowWorksConfirmationInput(true);
      });
    } else {
      setShowWorksConfirmationInput(false);
    }
  }, [contractValue]);

  if (error) {
    return <div>Error fetching projects</div>;
  }
  // Project Options
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
      className="bg-slate-100 p-4 border rounded-lg flex flex-col gap-6 items-start h-fit mx-auto mt-8 md:mt-16"
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center text-2xl lg:text-4xl font-bold text-primaryColor w-full mb-2 lg:mb-4">
        {t("ReportPage.workConfirmation.title")}
      </h1>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {!isLoading ? (
          <>
            <Input
              id="project"
              className="bg-slate-200"
              errors={errors}
              label={t("ReportPage.workConfirmation.projectsLabel")}
              options={[
                {
                  value: "",
                  text: t("ReportPage.workConfirmation.selectProject"),
                  asDefault: true,
                },
                ...optionsProjects,
              ]}
              register={register("project", { required: true })}
              errorMessage={t(
                "ReportPage.workConfirmation.projectErrorMessage"
              )}
            />
            {showContractInput && (
              <Input
                id="contract"
                className="bg-slate-200"
                errors={errors}
                label={t("ReportPage.workConfirmation.contractsLabel")}
                options={[
                  {
                    value: "",
                    text: t("ReportPage.workConfirmation.selectContract"),
                    asDefault: true,
                  },
                  ...optionsContracts,
                ]}
                register={register("contract", { required: true })}
                errorMessage={t(
                  "ReportPage.workConfirmation.contractErrorMessage"
                )}
              />
            )}
            {showWorksConfirmationInput ? (
              !workConfirmationLoading ? (
                <Input
                  id="workConfirmation"
                  className="bg-slate-200"
                  errors={errors}
                  label={t("ReportPage.workConfirmation.workConfirmationLabel")}
                  options={[
                    {
                      value: "",
                      text: t(
                        "ReportPage.workConfirmation.selectWorkConfirmation"
                      ),
                      asDefault: true,
                    },
                    ...optionWorksConfirmation,
                  ]}
                  register={register("workConfirmation", { required: true })}
                  errorMessage={t(
                    "ReportPage.workConfirmation.workConfirmationErrorMessage"
                  )}
                />
              ) : (
                <Loading />
              )
            ) : projectValue && contractValue ? (
              <Loading />
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <Button
        type="submit"
        disabled={!workConfirmationValue}>
        {t("ReportPage.saveButton")}
      </Button>
    </form>
  );
};

export default ReportWorkConfirmationForm;
