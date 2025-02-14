import React, { useState, useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axios.js";
import Loading from "../../componant/Loading.jsx";
import TaskDetails from "../WorkConfirmation/DetailsConfirmation/componantDetailsConfirmation/TableWorkItem/Tabs/TaskDetails.jsx";
import { useSelector } from "react-redux";
import TasksTab from "../WorkConfirmation/DetailsConfirmation/componantDetailsConfirmation/TableWorkItem/Tabs/TasksTab.jsx";
import Button from "../../componant/elements/Button.jsx";
import { IoAddOutline } from "react-icons/io5";

const TasksPage = () => {
  const user = useSelector((state) => state.user);
  const [tasksPage, setTasksPage] = useState(1);
  const [myTask, setMyTask] = useState(true);
  const [activeAddForm, setActiveAddForm] = useState(false);
  const tasksPerPage = 10;

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/projects/all`);
      return res.data.projects || [];
    },
  });

  const workConfirmationQueries = useQueries({
    queries:
      projects?.length > 0
        ? projects.flatMap((project) =>
            project.contracts
              ? project.contracts?.map((contractId) => ({
                  queryKey: ["fetchWorkConfirmation", contractId],
                  queryFn: async () => {
                    const res = await axiosInstance.get(
                      `/api/workConfirmation/${contractId}/contract`
                    );
                    return res.data;
                  },
                  enabled: !!contractId,
                }))
              : []
          )
        : [],
  });

  const tasksLoading =
    projectsLoading || workConfirmationQueries.some((query) => query.isLoading);
  const workConfirmations = useMemo(
    () =>
      workConfirmationQueries
        .map((query) => query.data)
        .filter(Boolean)
        .flat(),
    [workConfirmationQueries]
  );
  // Fetch Tasks
  const {
    data: tasks,
    isLoading: taskLoading,
    error: taskError,
    refetch: taskRefetch,
  } = useQuery({
    queryKey: ["getTasks"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/api/tasks`);
        return res.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });
  const totalPages = tasks ? Math.ceil(tasks.length / tasksPerPage) : 1;

  const paginatedTasks = useMemo(() => {
    if (!tasks) return [];
    const start = (tasksPage - 1) * tasksPerPage;
    return tasks.slice(start, start + tasksPerPage);
  }, [tasks, tasksPage]);

  return (
    <div>
      <div className="space-y-8 pt-6 md:pt-8 min-h-[24rem] flex-col">
        <div className="flex-1 flex flex-col h-full items-center justify-center">
          <div className="flex flex-col gap-4 size-full">
            <TasksTab
              title={<h1 className="lead">Tasks</h1>}
              setMyTask={setMyTask}
              myTask={myTask}
              data={
                !myTask
                  ? paginatedTasks
                  : paginatedTasks.filter(
                      (task) => task.assignee._id === user._id
                    )
              }
              loading={tasksLoading}
              disabled={true}
            />
          </div>
        </div>
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
