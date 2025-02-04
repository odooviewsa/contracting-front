import React from "react";
import Block from "../elements/Block";
import moment from "moment";

const Table = ({ title, header, body, footer }) => {
  return (
    <Block className="!p-0 scrollbar overflow-x-auto">
      {title && (
        <h2 className="text-lg font-medium text-primaryColor border-b p-4">
          {title}
        </h2>
      )}

      <div className="px-4">
        <table>
          <thead>
            {header.map((item) => (
              <th key={item} className="border-b py-6">
                {item}
              </th>
            ))}
          </thead>
          <tbody>{body}</tbody>
          {footer && <tfoot>{footer}</tfoot>}
        </table>
      </div>
    </Block>
  );
};

export default Table;
