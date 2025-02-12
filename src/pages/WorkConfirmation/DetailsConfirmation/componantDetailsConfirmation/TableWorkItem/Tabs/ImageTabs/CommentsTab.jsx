import React, { useEffect, useState } from "react";
import Button from "../../../../../../../componant/elements/Button";
import { IoAddOutline } from "react-icons/io5";
import Modal from "../../../../../../../componant/layout/Modal";
import Textarea from "../../../../../../../componant/elements/Textarea";
import { useForm } from "react-hook-form";
import CommentDetails from "./CommentDetails";
import { axiosInstance } from "../../../../../../../axios/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../../../../../../../componant/Loading";

const CommentsTab = ({ workItem, refetch, image }) => {
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [activeCommentForm, setActiveCommentForm] = useState(false);
  const [activeEditCommentForm, setActiveEditCommentForm] = useState({
    active: false,
    comment: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  const comments = workItem.workItemId.comments.filter(
    (comment) => comment.image === image
  );
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    formState: { errors: addErrors },
    reset: addReset,
  } = useForm();
  // Add Comment
  const addOnSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `/api/work/${workItem.workItemId._id}/details?image=${image}`,
        {
          comment: { userId: user._id, content: data.comment },
        }
      );
      if (res.status === 200) {
        setActiveCommentForm(false);
        toast.success("Comment added successfully");
        setIsLoading(false);
        refetch();
        addReset();
      }
    } catch (error) {
      toast.error("Something went wrong. try again later");
      console.error(error);
    }
  };
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
    setValue,
  } = useForm();
  // Edit Comment
  const editOnSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(
        `/api/work/${workItem.workItemId._id}/details?comment=${activeEditCommentForm.comment._id}&image=${image}`,
        {
          comment: { userId: user._id, content: data.comment },
        }
      );
      if (res.status === 200) {
        setActiveEditCommentForm(false);
        toast.success("Comment updated successfully");
        setIsLoading(false);
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong. try again later");
      console.error(error);
    }
  };
  // Delete Comment
  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.delete(
        `/api/work/${workItem.workItemId._id}/details?comment=${commentId}`
      );
      toast.success("Comment deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };
  useEffect(() => {
    if (
      activeEditCommentForm.active &&
      activeEditCommentForm.comment?.content
    ) {
      setValue("comment", activeEditCommentForm.comment.content);
    }
  }, [activeEditCommentForm, setValue]);
  return (
    <div className="max-h-full">
      <div className="flex items-center justify-between">
        <h3 className="lead">Comments</h3>
        <Button
          onClick={() => setActiveCommentForm(true)}
          className="flex items-center gap-2">
          <IoAddOutline size={18} /> Add Comment
        </Button>
      </div>
      <div className={"my-6 max-h-[80%] overflow-y-auto scrollbar"}>
        {/* Comments */}
        {currentComments.length > 0 ? (
          currentComments.map((comment, key) => {
            return (
              comment.image === image && (
                <CommentDetails
                  key={key}
                  comment={comment}
                  user={user}
                  handleDelete={handleDelete}
                  setActiveEditCommentForm={setActiveEditCommentForm}
                />
              )
            );
          })
        ) : (
          <p>No Comments</p>
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-primaryColor text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {/* Comment Form */}
      <Modal
        isActive={activeCommentForm}
        className="w-[50vh] h-fit overflow-y-auto scrollbar"
        title={"Add Comment"}
        body={
          <div>
            <form
              action=""
              onSubmit={addHandleSubmit(addOnSubmit)}
              className="flex flex-col gap-8">
              <Textarea
                label={"Comment"}
                register={addRegister("comment", {
                  required: true,
                })}
                rows={8}
                id={"comment"}
                errorMessage={"Comment is required"}
                placeholder={"Enter your comment"}
                errors={addErrors}
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveCommentForm(false)}
                  className="bg-slate-200 !text-primaryColor">
                  Cancel
                </Button>
                <Button type={"submit"} disabled={isLoading}>
                  {isLoading ? <Loading /> : "Add"}
                </Button>
              </div>
            </form>
          </div>
        }
      />
      {/* Edit Comment Form */}
      <Modal
        isActive={activeEditCommentForm.active}
        className="w-[50vh] h-fit overflow-y-auto scrollbar"
        title={"Edit Comment"}
        body={
          <div>
            <form
              action=""
              onSubmit={editHandleSubmit(editOnSubmit)}
              className="flex flex-col gap-8">
              <Textarea
                label={"Comment"}
                register={editRegister("comment", {
                  required: true,
                })}
                rows={8}
                id={"comment"}
                errorMessage={"Comment is required"}
                placeholder={"Enter your comment"}
                errors={editErrors}
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveEditCommentForm({ active: false })}
                  className="bg-slate-200 !text-primaryColor">
                  Cancel
                </Button>
                <Button type={"submit"} disabled={isLoading}>
                  {isLoading ? <Loading /> : "Save"}
                </Button>
              </div>
            </form>
          </div>
        }
      />
    </div>
  );
};

export default CommentsTab;
