import { IoSearch } from "react-icons/io5";

export default function InputSearch() {
  return (
    <div className="relative text-grayColor w-[100%] ml-1 md:ml-8 lg:ml-0  md:w-[30%]">
      <input
        type="text"
        placeholder="Search"
        className="rounded-full p-2 placeholder:text-[0.8rem] bg-bgInput w-full outline-none"
      />
      <div className="absolute top-3 right-3">
        <IoSearch size={15} />
      </div>
    </div>
  );
}
