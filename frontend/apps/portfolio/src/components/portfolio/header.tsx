import { FC, useState, useEffect } from "react"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ConvertNumber } from "ui";

type Props = {
  className?: string
  userData: any
  prices: any
  prices1d: any 
}

const Header: FC<Props> = ({ className, userData, prices, prices1d }) => {
  const [value, setValue] = useState("")
  const [valueDifference, setValueDifference] = useState("");
  const [positive, setPositive] = useState(true);
  const [valueDifferenceProc, setValueDifferenceProc] = useState("");
  useEffect(() => {
    let assetsValue = 0;
    let assetsValue1d = 0;
    if (!userData || !prices || !prices1d) {
      return
    }
    Object.keys(userData.coins).forEach((coin: string) => {
      assetsValue += userData.coins[coin] * prices.coins[coin];
      assetsValue1d += userData.coins[coin] * prices1d.coins[coin];
    });
    assetsValue > assetsValue1d ? setPositive(true) : setPositive(false);
    if(assetsValue1d != 0){
      setValueDifferenceProc((Math.abs((assetsValue / assetsValue1d) * 100 - 100)).toFixed(2))
    }else{
      setValueDifferenceProc("0.00")
    }
    setValueDifference(ConvertNumber(Math.abs((assetsValue - assetsValue1d)).toFixed(2)));
    setValue(ConvertNumber(assetsValue.toFixed(2)));
  }, [prices, userData, prices1d])
  return (
    <div className={className}>
      <div className="flex flex-col justify-start items-start w-1/4">
        <p className="text-4xl font-semibold">Portfolio value:</p>
        <div className="w-3/5 flex items-center justify-end mb-2">
          <p className="text-5xl font-semibold italic tracking-wider">${value}</p>
        </div>
        {value != ""  &&
          <p className={`text-3xl tracking-wider font-semibold ${positive ? "text-green-500" : "text-red-500"} flex flex-row items-center`}>
            {positive ? "+" : "-"} ${valueDifference}&nbsp;&nbsp;{positive && <IoIosArrowUp />}{!positive && <IoIosArrowDown />}{valueDifferenceProc}%&nbsp;&nbsp;(24h)
          </p>
        }
      </div>
      <div className="">
      </div>
    </div>
  )
}
export default Header;
