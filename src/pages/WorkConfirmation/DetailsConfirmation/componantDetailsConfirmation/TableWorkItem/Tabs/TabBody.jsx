const TabBody = ({ title, button, children, className = "" }) => {
  return (
    <div>
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-y-4 ${className}`}>
        {title}
        {button}
      </div>
      <div className="py-4">{children}</div>
    </div>
  );
};
export default TabBody;
