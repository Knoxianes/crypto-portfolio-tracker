import { FC, useEffect, useState, useRef } from "react"
import { TransactionType, UserDataType } from "../../consts/types"
import { ConvertNumber } from "ui"

type Props = {
  className?: string
  selectedCoin: string
  transactionType: string
  userData: any
  setUserData: (value: UserDataType) => void
  setShowAddTransactionMenu: (value: boolean) => void
  transactions: TransactionType[]
  setTransactions: (value: TransactionType[]) => void
}
const AddTransaction: FC<Props> = ({ className, selectedCoin, transactionType, userData, setUserData }) => {
  const [quantity, setQuantity] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<string>("");


  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTotal(0)
    const prices = JSON.parse(sessionStorage.getItem("prices") as string) as any
    if (!prices || !priceRef.current || !quantityRef.current || selectedCoin == "") {
      return
    }
    setQuantity(0)
    quantityRef.current.value = "";
    setPrice(prices.coins[selectedCoin])
    priceRef.current.value = prices.coins[selectedCoin]
    setDate("")
  }, [selectedCoin, transactionType])
  const onClickAddTransaction = async () => {
    if (!quantity) {
      alert("Please add quantity")
      return
    }
    if (!price) {
      alert("Please add price")
      return
    }
    if (date == "") {
      alert("Please add date")
      return
    }
    if (!userData) {
      alert("Server error")
      return
    }
    setLoading(true)
    const selCoin = selectedCoin;
    const transactionQuantity = transactionType == "buy" ? quantity : -1 * quantity
    const transactionPrice = price
    const data = {
      username: userData.username,
      date: (new Date(date)).getTime(),
      coin: selCoin,
      quantity: transactionQuantity,
      price: transactionPrice
    }

    const result = await fetch('/api/transactions', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const fetchData = await result.json();
    setLoading(false)
    if (fetchData.message == "error") {
      alert("Server error")
      return
    }
    sessionStorage.removeItem("data1d");
    sessionStorage.removeItem("data7d");
    sessionStorage.removeItem("data30d");
    sessionStorage.removeItem("transactions");
    const coin = fetchData.coin;
    const newQuantity = fetchData.quantity;
    const newUserData = { ...userData };
    newUserData.coins[coin] = newQuantity;
    setUserData(newUserData);
    sessionStorage.setItem("userData", JSON.stringify(newUserData));
    location.reload();
  }
  const onQuantityChange = (e: any) => {
    if (e.currentTarget.value == "" || !quantityRef.current || !userData || selectedCoin == "" || price == undefined) {
      setQuantity(0)
      setTotal(0)
      return
    }
    const quantity = parseFloat(e.currentTarget.value)
    if (quantity > userData.coins[selectedCoin] && transactionType == "sell") {
      setQuantity(userData.coins[selectedCoin])
      quantityRef.current.value = userData.coins[selectedCoin]
      setTotal(userData.coins[selectedCoin] * price)
      return
    }
    setQuantity(quantity)
    setTotal(quantity * price)
  }
  const onPriceChange = (e: any) => {
    if (e.currentTarget.value == "") {
      return
    }
    setPrice(parseFloat(e.currentTarget.value))
    if (quantity == undefined) {
      setTotal(0)
      return
    }
    setTotal(parseFloat(e.currentTarget.value) * quantity)
  }
  const isDisabled = () => {
    if (selectedCoin == "" || selectedCoin == "usdt" || selectedCoin == "usdc") {
      return true
    }
    return false
  }
  const max = () => {
    if (!userData) {
      return undefined
    }
    if (selectedCoin == "") {
      return undefined
    }
    if (transactionType == "sell") {
      return userData.coins[selectedCoin]
    }
    return undefined
  }
  return (
    <div className={className}>
      <div className="w-full flex flex-row text-2xl gap-3">
        <div className="w-1/3  flex flex-col gap-3">
          <label>Quantity</label>
          <input type="number" min={0} onChange={onQuantityChange} ref={quantityRef} disabled={selectedCoin == "" ? true : false}
            max={max()}
            className="w-full noarrows py-4 px-5 border border-gray-400 shadow-md shadow-gray-300 rounded-lg focus:outline-blue-400" placeholder="0.00" />
        </div>
        <div className="w-1/3  flex flex-col gap-3">
          <label>Price</label>
          <input type="number" min={0} onChange={onPriceChange} ref={priceRef} disabled={isDisabled()}
            className="w-full noarrows py-4 px-5 border border-gray-400 shadow-md shadow-gray-300 rounded-lg focus:outline-blue-400" placeholder="0.00" />
        </div>
        <div className="w-1/3  flex flex-col gap-3">
          <label>Date</label>
          <input type="date" onChange={(e) => setDate(e.currentTarget.value ? e.currentTarget.value : "")} disabled={selectedCoin == "" ? true : false}
           max={new Date().toISOString().split("T")[0]} value={date} className="w-full  py-[0.9rem] px-5 border border-gray-400 shadow-md shadow-gray-300 rounded-lg focus:outline-blue-400" />
        </div>
      </div>
      <div className="w-full p-6 flex flex-col bg-slate-200 rounded-2xl gap-3">
        <label className="text-2xl text-gray-400">Total spent</label>
        <label className="text-4xl font-semibold">$ {ConvertNumber(total.toFixed(2))}</label>
      </div>
      <button className="text-4xl flex justify-center items-center text-white font-semibold bg-pink-900 rounded-2xl w-full shadow-md shadow-gray-300 py-5 hover:scale-[1.02] transition" onClick={onClickAddTransaction}>
        {
          loading ? (
            <div className="w-9 h-9 border-4 rounded-[50%] border-b-transparent rotate" />
          ) : (
            <>
              Add transaction
            </>
          )
        }
      </button >
    </div >
  )
}

export default AddTransaction;
