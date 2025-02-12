import React, { useState } from "react";

const ColTabs = ({ items }) => {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div className="h-[75vh] flex flex-col md:flex-row justify-between">
      <div className="md:w-[25%] md:py-4 flex flex-row md:flex-col flex-wrap">
        {items.map((item, key) => (
          <button
            key={key}
            onClick={() => {
              setActiveItem(key);
            }}
            className={`bg-gray-100 w-full py-3 rtl:md:first:rounded-tl-lg rtl:md:last:rounded-bl-lg ltr:md:first:rounded-tr-lg ltr:md:last:rounded-br-lg text-primaryColor font-medium text-sm ${
              key === activeItem ? "bg-slate-200" : "bg-slate-100"
            }`}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="flex flex-col h-full py-4 px-6 md:w-3/4">
        <>{items[activeItem].component}</>
      </div>
    </div>
  );
};

export default ColTabs;
