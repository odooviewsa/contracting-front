import { useEffect, useRef, useState } from "react";

const Tabs = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const buttonFocus = useRef();
  useEffect(() => {
    buttonFocus.current.focus();
  }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-fit flex-wrap flex gap-4 bg-gray-100 p-2 rounded-md">
        {items.map((item, index) => (
          <button
            ref={index === 0 ? buttonFocus : null}
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`opacity-70 font-medium text-sm px-3 py-2 ${
              index === selectedTab &&
              "bg-white text-primaryColor rounded !opacity-100 shadow"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="py-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${selectedTab === index ? "" : "hidden"}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tabs;
