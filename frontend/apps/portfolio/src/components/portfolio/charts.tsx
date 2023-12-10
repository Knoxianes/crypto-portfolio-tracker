import { FC, useState, useEffect } from "react"
import { AreaChart, PieChart, Pie, XAxis, YAxis, Area, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from "recharts"
import { getCookie } from "ui"
import CustomToolTipArea from "./customToolTipArea"
import CustomToolTipPie from "./customToolTipPie"
import CustomYAxisTick from "./customYAxisTick"
import CustomLegendForPie from "./customLegendForPie"
import { colors } from "../../consts/consts"

type Props = {
  className?: string
  prices: any
  userData: any
}
const Charts: FC<Props> = ({ className, prices, userData }) => {
  const [periodSelected, setPeriodSelected] = useState("1d");
  const [dataAreaChart, setDataAreaChart] = useState([]);
  const [dataPieChart, setDataPieChart] = useState([]);
  const [positive, setPositive] = useState(true);

  const fetchAreaChartData1d = async () => {
    const token = getCookie("token");
    const data = JSON.parse(sessionStorage.getItem(`data1d`) as string)
    if (!data) {
      const response = await fetch(`/api/chart/1d/${token}`);
      const data = await response.json();
      if (data.message == "error") {
        alert("Server error")
        return
      }
      setDataAreaChart(data.data);
      sessionStorage.setItem(`data1d`, JSON.stringify(data.data))
      data.data[0].value < data.data[data.data.length - 1].value ? setPositive(true) : setPositive(false);
      return
    }
    if (data[0].unix <= Date.now() - 3.6e6 * 24 - 300000) {
      const response = await fetch(`/api/chart/1d/${token}`);
      const data = await response.json();
      if (data.message == "error") {
        alert("Server error")
        return
      }
      setDataAreaChart(data.data);
      sessionStorage.setItem(`data1d`, JSON.stringify(data.data))
      data.data[0].value < data.data[data.data.length - 1].value ? setPositive(true) : setPositive(false);
    }

    setDataAreaChart(data)
    data[0].value < data[data.length - 1].value ? setPositive(true) : setPositive(false);
  }
  const fetchAreaChartData7d = async () => {
    const token = getCookie("token");
    const data = JSON.parse(sessionStorage.getItem(`data7d`) as string)
    if (!data) {
      const response = await fetch(`/api/chart/7d/${token}`);
      const data = await response.json();
      if (data.message == "error") {
        alert("Server error")
        return
      }
      setDataAreaChart(data.data);
      sessionStorage.setItem(`data7d`, JSON.stringify(data.data))
      data.data[0].value < data.data[data.data.length - 1].value ? setPositive(true) : setPositive(false);
      return
    }
    if (data[0].unix <= Date.now() - 3.6e6 * 24 * 7 - 300000) {
      const response = await fetch(`/api/chart/7d/${token}`);
      const data = await response.json();
      if (data.message == "error") {
        alert("Server error")
        return
      }
      setDataAreaChart(data.data);
      sessionStorage.setItem(`data7d`, JSON.stringify(data.data))
      data.data[0].value < data.data[data.data.length - 1].value ? setPositive(true) : setPositive(false);
    }

    setDataAreaChart(data)
    data[0].value < data[data.length - 1].value ? setPositive(true) : setPositive(false);
  }
  const fetchAreaChartData30d = async () => {
    const token = getCookie("token");
    const data = JSON.parse(sessionStorage.getItem(`data30d`) as string)
    if (!data) {
      const response = await fetch(`/api/chart/30d/${token}`);
      const data = await response.json();
      if (data.message == "error") {
        alert("Server error")
        return
      }
      setDataAreaChart(data.data);
      sessionStorage.setItem(`data30d`, JSON.stringify(data.data))
      data.data[0].value < data.data[data.data.length - 1].value ? setPositive(true) : setPositive(false);
      return
    }
    if (data[0].unix <= Date.now() - 3.6e6 * 24 * 30 - 300000) {
      const response = await fetch(`/api/chart/30d/${token}`);
      const data = await response.json();
      if (data.message == "error") {
        alert("Server error")
        return
      }
      setDataAreaChart(data.data);
      sessionStorage.setItem(`data30d`, JSON.stringify(data.data))
      data.data[0].value < data.data[data.data.length - 1].value ? setPositive(true) : setPositive(false);
    }

    setDataAreaChart(data)
    data[0].value < data[data.length - 1].value ? setPositive(true) : setPositive(false);
  }
  const fetchPieChartData = () => {
    if (!prices || !userData) {
      return
    }
    const data:any = [];
    Object.keys(userData.coins).forEach((coin: string) => {
      const assetValue = prices.coins[coin] * userData.coins[coin];
      if (assetValue <= 0) {
        return
      }
      data.push({
        "coin": coin,
        "value": assetValue
      })
    })
    setDataPieChart(data)
  }
  useEffect(() => {
    setPeriodSelected("1d")
    fetchAreaChartData1d()
    fetchPieChartData()
  }, [prices, userData])
  const onClick1d = () => {
    setPeriodSelected("1d")
    fetchAreaChartData1d()
  }
  const onClick7d = () => {
    setPeriodSelected("7d")
    fetchAreaChartData7d()
  }
  const onClick30d = () => {
    setPeriodSelected("30d")
    fetchAreaChartData30d()
  }
  const calculateDomain = ([dataMin, dataMax]:any):any => {
    const difference = dataMax - dataMin;
    const firstPart = Math.round(dataMin - difference);
    const secondPart = Math.round(dataMax + difference);
    return [firstPart, secondPart];
  }

  return (

    <div className={className}>
      <div className="w-[48%] h-[50vh] border-2 border-gray-300 shadow-lg shadow-gray-500 rounded-lg p-8 flex flex-col">
        <div className="flex h-[10%] w-full flex-row justify-between items-center">
          <h2 className="text-4xl text-black font-bold">History</h2>
          <div className="w-1/4 h-full text-2xl bg-slate-200 font-normal flex flex-row items-center text-gray-600 p-2 gap-2 rounded-lg shadow-gray-500 shadow-md">
            <button className={`w-1/3 h-full flex justify-center items-center ${periodSelected == "1d" ? "text-black bg-white" : "hover:text-gray-950"} transition cursor-pointer rounded-lg`} onClick={onClick1d}>24h</button>
            <button className={`w-1/3 h-full flex justify-center items-center ${periodSelected == "7d" ? "text-black bg-white" : "hover:text-gray-950"} transition cursor-pointer rounded-lg`} onClick={onClick7d}>7d</button>
            <button className={`w-1/3 h-full flex justify-center items-center ${periodSelected == "30d" ? "text-black bg-white" : "hover:text-gray-950"} transition rounded-lg`} onClick={onClick30d}>30d</button>
          </div>
        </div>
        <div className="flex justify-start items-center h-[90%] w-full pt-6">
          <ResponsiveContainer width="100%" height="100%" >
            <AreaChart data={dataAreaChart}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`${positive ? "rgb(34,197,94)" : "rgb(239,68,68)"}`} stopOpacity={0.6} />
                  <stop offset="10%" stopColor={`${positive ? "rgb(34,197,94)" : "rgb(239,68,68)"}`} stopOpacity={0.8} />
                  <stop offset="85%" stopColor={`${positive ? "rgb(34,197,94)" : "rgb(239,68,68)"}`} stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: "10" }} minTickGap={12} allowDuplicatedCategory={false} />
              <YAxis type="number" domain={calculateDomain}
                tick={<CustomYAxisTick />} tickLine={false} axisLine={false} tickCount={7} />
              <Tooltip content={<CustomToolTipArea positive={positive} />} />
              <CartesianGrid strokeDasharray={"3 3"} />
              <Area type="monotone" dataKey="value" stroke={`${positive ? "rgb(34,197,94)" : "rgb(239,68,68)"}`} fillOpacity={1} fill="url(#color)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-[48%] h-[50vh] border-2 border-gray-300 shadow-lg shadow-gray-500 rounded-lg p-9 flex flex-col">
        <div className="flex h-[10%] w-full flex-row justify-start items-center">
          <h2 className="text-4xl text-black font-bold">Allocation</h2>
        </div>
        <div className="flex justify-center items-center h-[90%] w-full ">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart >
              <Pie data={dataPieChart} dataKey={"value"} nameKey={"coin"} innerRadius={70} outerRadius={95}>
                {dataPieChart.map((entry:any, index:number) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.coin]} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="right" content={<CustomLegendForPie/>} />
              <Tooltip content={<CustomToolTipPie />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
export default Charts;
