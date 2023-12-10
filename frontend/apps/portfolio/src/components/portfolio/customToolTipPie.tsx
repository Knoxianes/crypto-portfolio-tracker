import { fullcoinnames } from "../../consts/consts";
const CustomToolTipPie = ({ active, payload }:any) => {

  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-lg shadow-md shadow-gray-400 flex items-center justify-center text-2xl font-semibold gap-2 bg-white">
        {fullcoinnames[payload[0].name]}
      </div>
    );
  }

  return null;
}

export default CustomToolTipPie;
