const DetailsWidget = ({ widget }) => {
  return (
    <div className="flex items-center gap-8 bg-gray-100 rounded-lg p-4 border">
      <div className={`p-2 rounded-lg bg-white ${widget.iconColor}`}>
        {widget.icon}
      </div>
      <div className="flex-1 flex flex-col gap-2 items-start justify-center">
        <p>{widget.text}</p>
        <p className="font-medium text-lg">{widget.value}</p>
      </div>
    </div>
  );
};
export default DetailsWidget;
