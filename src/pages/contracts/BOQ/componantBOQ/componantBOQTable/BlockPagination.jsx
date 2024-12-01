import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import PropTypes from "prop-types";
export default function BlockPagination({
  valueSearch,
  setNumberSliceFirst,
  setNumberSlice,
  numberSlice,
  numberSliceFirst,
  lengthArray,
}) {
  return (
    <div
      className={`p-3 bg-bgWhite flex justify-end items-center gap-5 text-colorTextValueItem text-[0.9rem] ${
        valueSearch && "hidden"
      }`}
    >
      <p>Rows per page : 5</p>
      <p>
        {numberSliceFirst + 1}-{numberSlice} of {lengthArray}
      </p>
      <div className="flex items-center gap-3">
        <button
          disabled={numberSliceFirst == 0}
          onClick={() => {
            setNumberSliceFirst((e) => e - 5);
            setNumberSlice((e) => e - 5);
          }}
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={() => {
            setNumberSliceFirst((e) => e + 5);
            setNumberSlice((e) => e + 5);
          }}
          disabled={lengthArray <= numberSlice}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

BlockPagination.propTypes = {
  valueSearch: PropTypes.string,
  setNumberSliceFirst: PropTypes.func,
  setNumberSlice: PropTypes.func,
  numberSlice: PropTypes.number,
  numberSliceFirst: PropTypes.number,
  lengthArray: PropTypes.number,
};
