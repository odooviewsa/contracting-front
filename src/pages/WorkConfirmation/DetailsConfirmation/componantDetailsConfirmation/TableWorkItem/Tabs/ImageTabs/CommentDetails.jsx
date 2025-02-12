import React from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

const CommentDetails = ({
  comment,
  user,
  handleDelete,
  setActiveEditCommentForm,
  className = "",
}) => {
  return (
    <div className={`border-b space-y-1 py-6 ${className}`}>
      <p className="text-grayColor text-sm flex items-center gap-2">
        {`${comment.userId.firstName} ${comment.userId.secondName}`}
        {comment.userId._id === user._id && (
          <>
            {" "}
            <IoCreateOutline
              onClick={() =>
                setActiveEditCommentForm({
                  active: true,
                  comment: { ...comment },
                })
              }
              size={14}
              className="hover:text-black cursor-pointer"
            />
            <IoTrashOutline
              onClick={() => handleDelete(comment._id)}
              size={14}
              className="hover:text-black cursor-pointer"
            />
          </>
        )}
      </p>
      <p className="lead ">{comment.content}</p>
    </div>
  );
};

export default CommentDetails;
