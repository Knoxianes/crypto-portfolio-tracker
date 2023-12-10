import { ChangeEvent, FC, useEffect, useState } from "react"
import { logo, fullcoinnames, coinlist } from "../../consts/consts"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
  className?: string
  setSelectedCoin: (value: string) => void
  setTransactionType: (value: string) => void
  transactionType: string
  selectedCoin: string
  userData: any 
}
let coinListForFilter = [...coinlist]
const EditSearch: FC<Props> = ({ className, transactionType, setSelectedCoin, setTransactionType, selectedCoin, userData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [coinList, setCoinList] = useState(coinlist)
  useEffect(() => {
    if (transactionType == "sell") {
      if (!userData) {

        return
      }
      const newList = coinlist.filter((curretValue: string) => {

        if (userData.coins[curretValue] != null && userData.coins[curretValue] > 0) {
          return curretValue;
        }
      })
      coinListForFilter = [...newList]
      setCoinList(coinListForFilter)
    } else {
      coinListForFilter = [...coinlist]
      setCoinList(coinListForFilter)
    }
  }, [transactionType,userData])
  const onClickDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }
  const onSelect = (coin: string) => {
    setDrawerOpen(false)
    setSelectedCoin(coin)
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newList = coinlist.filter((currentValue: string) => {
      if (fullcoinnames[currentValue].toLowerCase().includes(e.currentTarget.value.toLowerCase()) || currentValue.toLowerCase().includes(e.currentTarget.value.toLowerCase())) {
        return currentValue;
      }
    })
    setCoinList(newList)
  }
  return (
    <div className={className}>
      <div className="w-full h-16 flex flx-row items-center bg-slate-200 text-3xl gap-4 font-medium py-2 px-6 rounded-lg ">
        <div className={`w-1/2 h-full flex items-center justify-center rounded-2xl cursor-pointer ${transactionType == "buy" ? "bg-white" : ""}`} onClick={() => setTransactionType("buy")}>
          <label>Buy</label>
        </div>
        <div className={`w-1/2 h-full flex items-center justify-center rounded-2xl cursor-pointer ${transactionType == "sell" ? "bg-white" : ""}`} onClick={() => setTransactionType("sell")}>
          <label>Sell</label>
        </div>
      </div>
      <div className="w-full h-20 border border-gray-300 rounded-lg px-6 py-2 gap-4 flex items-center justify-between cursor-pointer">
        <div className="flex items-center w-[95%] h-full text-3xl">
          {drawerOpen ? (
            <input type="text" className="w-full h-full font-normal focus:outline-none" autoFocus onChange={onChangeInput} />
          ) : (
            <>
              {selectedCoin == "" ? (
                <label className="text-gray-400 w-full cursor-pointer" onClick={onClickDrawer}>
                  Select coin
                </label>
              ) : (
                <div className="flex items-center gap-2 w-full h-full" onClick={onClickDrawer}>
                  <img src={logo[selectedCoin]} className="h-10 w-10" />
                  <label className="font-semibold">{fullcoinnames[selectedCoin]}</label>
                  <label className="text-gray-400">{selectedCoin.toUpperCase()}</label>
                </div>
              )}
            </>

          )
          }
        </div>
        <div className="text-2xl flex items-center justify-center w-[5%] h-full hover:scale-125 transition" onClick={onClickDrawer}>
          {drawerOpen ? (
            <IoIosArrowUp />
          ) : (
            <IoIosArrowDown />
          )
          }
        </div>
        {drawerOpen &&
          <div className="absolute w-[452px] top-[38.5%] border-2 border-gray-300 max-h-60 overflow-y-scroll noscrollbar rounded-lg flex flex-col gap-2 left-[35.3%] shadow-md shadow-gray-300 bg-white px-6 py-2">
            {
              coinList.map((coin: string) => {
                return (
                  <div key={coin} className="w-full flex items-center gap-4 rounded-lg hover:bg-gray-200 text-2xl p-4" onClick={() => onSelect(coin)}>
                    <img src={logo[coin]} className="h-10 w-10" />
                    <label className="font-semibold">{fullcoinnames[coin]}</label>
                    <label className="text-gray-400">{coin.toUpperCase()}</label>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

export default EditSearch;
