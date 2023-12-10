import { ConvertNumber } from "ui"

type Props = {
  active?: any
  payload?: any
  label?: any
  positive?: any
}
const CustomToolTipArea = ({ active, payload, label, positive }:Props) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-lg shadow-md shadow-gray-400 flex flex-col gap-2 bg-white">
        <h3 className="text-2xl font-semibold w-full">{label}</h3>
        <div className="flex flex-row items-center justify-between">
          <div className={`w-6 h-6 rounded-[50%] border border-black ${positive ? "bg-green-500" : "bg-red-500"}`}></div>
          <p className="font-medium text-2xl">${ConvertNumber(payload[0].value.toFixed(2))}</p>
        </div>
      </div>
    );
  }

  return null;
}
export default CustomToolTipArea;
