

export default function PointBetween() {
  return (
    <div className="flex items-center gap-[1px] ml-5">
          { [ 1, 2, 3, 4, 5, 6, 7, 8, 9,1,1,1,1,1,1,1,1,1,1 ].map( ( _, i ) => (
            <div key={i} className="w-[2px] h-[2px] rounded-md bg-gray-300"></div>
        ))}
    </div>
  )
}
