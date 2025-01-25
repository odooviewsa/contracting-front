const TabBody = ({ title, button, children, className = "" }) => {
  return (
    <div>
      <div className={`flex items-center justify-between ${className}`}>
        <h4 className="lead">{title}</h4>
        {button}
      </div>
      <div className="py-4">{children}</div>
    </div>
  );
};
export default TabBody;
