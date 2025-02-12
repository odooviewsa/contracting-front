import React, { useState, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axios.js";
import Loading from "../../componant/Loading.jsx";
import TaskDetails from "../WorkConfirmation/DetailsConfirmation/componantDetailsConfirmation/TableWorkItem/Tabs/TaskDetails.jsx";

const TasksPage = () => {
  const [tasksPage, setTasksPage] = useState(1);
  const tasksPerPage = 10;

  const {
    data: projects,
  } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/projects/all`
      );
      return res.data.projects || [];
    },
  });

  const workConfirmationQueries = useQueries({
    queries:
      projects?.flatMap((project) =>
        project.contracts.map((contractId) => ({
          queryKey: ["fetchWorkConfirmation", contractId],
          queryFn: async () => {
            const res = await axiosInstance.get(
              `/api/workConfirmation/${contractId}/contract`
            );
            return res.data;
          },
          enabled: !!contractId,
        }))
      ) || [],
  });

  const tasksLoading = workConfirmationQueries.some((query) => query.isLoading);

  const workConfirmations = useMemo(
    () =>
      workConfirmationQueries
        .map((query) => query.data)
        .filter(Boolean)
        .flat(),
    [workConfirmationQueries]
  );

  const tasks = useMemo(
    () =>
      workConfirmations.flatMap(
        (workConfirm) =>
          workConfirm.workItems?.flatMap(
            (workItem) => workItem.workItemId?.tasks || []
          ) || []
      ),
    [workConfirmations]
  );
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginatedTasks = useMemo(() => {
    const start = (tasksPage - 1) * tasksPerPage;
    return tasks.slice(start, start + tasksPerPage);
  }, [tasks, tasksPage]);

  return (
    <div>
      <h1 className="lead">Tasks</h1>
      <div className="space-y-8">
        {tasksLoading ? (
          <div className="h-[24rem] w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : paginatedTasks?.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <div className="flex flex-col gap-4">
            {paginatedTasks?.map((task, index) => (
              <TaskDetails disabled={true} key={index} {...task} />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setTasksPage((prev) => Math.max(prev - 1, 1))}
            className="disabled:bg-slate-200 bg-primaryColor text-white disabled:text-primaryColor text-sm font-medium p-3 rounded disabled:cursor-not-allowed"
            disabled={tasksPage === 1 || tasksLoading}>
            Previous
          </button>
          <span className="text-grayColor">
            Page {tasksPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setTasksPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="disabled:bg-slate-200 bg-primaryColor text-white disabled:text-primaryColor text-sm font-medium p-3 rounded disabled:cursor-not-allowed"
            disabled={tasksPage === totalPages || tasksLoading}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
