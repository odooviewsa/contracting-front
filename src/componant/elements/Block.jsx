import React from "react";

const Block = ({ className = "",style, children }) => {
  return (
    <div className={`p-4 border rounded-lg shadow ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Block;
