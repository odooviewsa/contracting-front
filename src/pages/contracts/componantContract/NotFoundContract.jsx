import notFoundContract from "../../../assets/images/notFoundContract.png";

export default function NotFoundContract() {
  return (
    <div className="flex justify-center">
      <img
        src={notFoundContract}
        alt="notFoundContract"
        className="w-[30%] mx-auto"
      />
    </div>
  );
}
