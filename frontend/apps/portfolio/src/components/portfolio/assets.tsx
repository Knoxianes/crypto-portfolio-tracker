import { FC, useState, useEffect } from "react"
import { logo, fullcoinnames } from "../../consts/consts"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ConvertNumber } from "ui";

type Props = {
  className?: string
  userData: any
  prices: any
  prices1h: any
  prices1d: any
  prices7d: any
}
const Assets: FC<Props> = ({ userData, className, prices, prices1h, prices1d, prices7d }) => {
  const [assets, setAssets] = useState<any>([]);

  useEffect(() => {
    const assets: any = [];
    if (!prices || !userData || !prices1h || !prices1d || !prices7d) {
      return
    }
    Object.keys(userData.coins).forEach((coin:string) => {
      const assetValue = userData.coins[coin] * prices.coins[coin];
      if (assetValue == 0) {
        return
      }
      const assetValue1Hour = userData.coins[coin] * prices1h.coins[coin];
      const assetValue1d = userData.coins[coin] * prices1d.coins[coin];
      const assetValue7d = userData.coins[coin] * prices7d.coins[coin];
      const oneHourProcentage = assetValue / assetValue1Hour * 100 - 100;
      const oneDayProcentage = assetValue / assetValue1d * 100 - 100;
      const sevenDayProcentage = assetValue / assetValue7d * 100 - 100;
      const newAsset: any = {
        coin: coin,
        price: ConvertNumber(prices.coins[coin].toFixed(2)),
        hourProcentage: {
          value: Math.abs(oneHourProcentage).toFixed(2),
          positive: oneHourProcentage >= 0 ? true : false
        },
        dayProcentage: {
          value: Math.abs(oneDayProcentage).toFixed(2),
          positive: oneDayProcentage >= 0 ? true : false
        },
        sevenDayProcentage: {
          value: Math.abs(sevenDayProcentage).toFixed(2),
          positive: sevenDayProcentage >= 0 ? true : false
        },
        quantity: userData.coins[coin],
        value: ConvertNumber(assetValue.toFixed(2)),
        valueNumber: assetValue
      }
      assets.push(newAsset)
    })
    assets.sort((a:any,b:any) =>  b.valueNumber - a.valueNumber) 
    setAssets(assets)

  }, [userData, prices, prices1h, prices1d, prices7d])

  return (
    <div className={className}>
      <h2 className="text-5xl text-black font-bold">Assets</h2>
      <div className="w-full flex flex-col">
        <div className="w-full text-right grid grid-cols-8 text-3xl font-semibold px-3 py-5 border-b border-t border-gray-200">
          <div className="col-span-2 text-left">Name</div>
          <div className="col-span-2">Price</div>
          <div>1h%</div>
          <div>24h%</div>
          <div>7d%</div>
          <div>Holdings</div>
        </div>
        {
          assets.map((asset:any) => {
            return (
              <div key={asset.coin} className="w-full grid grid-cols-8 text-3xl px-3 py-5 border-b border-gray-200 hover:bg-blue-100 rounded-lg">
                <div className="col-span-2 flex flex-row items-center justify-start gap-4">
                  <img src={logo[asset.coin]} className="w-10 h-10" />
                  <label className="font-bold">{fullcoinnames[asset.coin]}</label>
                  <label className="text-black/70">{asset.coin.toUpperCase()}</label>
                </div>
                <div className="flex col-span-2 items-center justify-end">
                  ${asset.price}
                </div>
                <div className={`flex flex-row justify-end items-center ${asset.hourProcentage.positive ? "text-green-500" : "text-red-500"}`}>
                  {asset.hourProcentage.positive && <IoIosArrowUp />}
                  {!asset.hourProcentage.positive && <IoIosArrowDown />}
                  {asset.hourProcentage.value}%
                </div>
                <div className={`flex flex-row justify-end items-center ${asset.dayProcentage.positive ? "text-green-500" : "text-red-500"}`}>
                  {asset.dayProcentage.positive && <IoIosArrowUp />}
                  {!asset.dayProcentage.positive && <IoIosArrowDown />}
                  {asset.dayProcentage.value}%
                </div>
                <div className={`flex flex-row justify-end items-center ${asset.sevenDayProcentage.positive ? "text-green-500" : "text-red-500"}`}>
                  {asset.sevenDayProcentage.positive && <IoIosArrowUp />}
                  {!asset.sevenDayProcentage.positive && <IoIosArrowDown />}
                  {asset.sevenDayProcentage.value}%
                </div>
                <div className="flex flex-col text-right">
                  <label className="font-semibold">${asset.value}</label>
                  <label className="text-gray-500 text-xl">{parseFloat(asset.quantity.toFixed(5))} {asset.coin.toUpperCase()}</label>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Assets;
