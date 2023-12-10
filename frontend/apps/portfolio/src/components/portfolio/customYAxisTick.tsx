import { ConvertNumber } from "ui"

const CustomYAxisTick = ({ x, y, payload }:any) => {
  return (
    <g transform={`translate(${x},${y - 13})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#000"
        fontSize={11}
      >
        ${ConvertNumber(payload.value.toFixed(2))}
      </text>
    </g>
  )
}

export default CustomYAxisTick;
