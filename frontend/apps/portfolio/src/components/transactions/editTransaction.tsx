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
  transaction: TransactionType
}
const EditTransaction: FC<Props> = ({ className, selectedCoin, transactionType, userData, setUserData, setShowAddTransactionMenu, transactions, setTransactions, transaction }) => {
  const [quantity, setQuantity] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(transaction.date).toISOString().split('T')[0]);

  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prices = JSON.parse(sessionStorage.getItem("prices") as string) as any
    if (!prices || !priceRef.current || !quantityRef.current || selectedCoin == "") {
      return
    }
    if (selectedCoin == transaction.coin && transactionType == "buy") {
        setQuantity(transaction.quantity)
        setTotal(transaction.quantity * prices.coins[selectedCoin])
        quantityRef.current.value = transaction.quantity.toString()
    } else {
      setTotal(0)
      setQuantity(0)
      quantityRef.current.value = "";
    }
    setPrice(prices.coins[selectedCoin])
    priceRef.current.value = prices.coins[selectedCoin]
  }, [selectedCoin, transactionType])
  const onClickSaveTransaction = async () => {
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
    const data: TransactionType = {
      username: userData.username,
      date: (new Date(date)).getTime(),
      coin: selCoin,
      quantity: transactionQuantity,
      price: transactionPrice,
      transaction_id: transaction.transaction_id
    }

    const result = await fetch('/api/transactions', {
      method: "PUT",
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
    const newcoin = fetchData.newcoin;
    const newQuantity = fetchData.newquantity;
    const oldcoin = fetchData.oldcoin;
    const oldQuantity = fetchData.oldquantity;
    const newUserData = { ...userData };
    newUserData.coins[oldcoin] = oldQuantity
    newUserData.coins[newcoin] = newQuantity
    setUserData(newUserData);
    sessionStorage.setItem("userData", JSON.stringify(newUserData));
    const newTransactions = transactions.filter((tmp) => tmp.transaction_id != data.transaction_id)
    newTransactions.push(data)
    newTransactions.sort((a, b) => b.date - a.date)
    setTransactions(newTransactions)
    sessionStorage.setItem("transactions", JSON.stringify(newTransactions));
    setShowAddTransactionMenu(false)
  }
  const onClickDelete = async () => {
    if (!userData) {
      alert("Server error")
      return
    }
    const result = await fetch('/api/transactions', {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "transaction_id": transaction.transaction_id })
    })
    const fetchData = await result.json();
    if (fetchData.message == "error") {
      alert("Server error")
      return
    }
    sessionStorage.removeItem("data1d");
    sessionStorage.removeItem("data7d");
    sessionStorage.removeItem("data30d");
    const coin = fetchData.coin;
    const newQuantity = fetchData.quantity;
    const newUserData = { ...userData };
    newUserData.coins[coin] = newQuantity;
    setUserData(newUserData);
    sessionStorage.setItem("userData", JSON.stringify(newUserData));
    const newTransactions = transactions.filter((tmp: TransactionType) => tmp.transaction_id != transaction.transaction_id)
    newTransactions.sort((a, b) => b.date - a.date)
    setTransactions(newTransactions)
    sessionStorage.setItem("transactions", JSON.stringify(newTransactions));
    setShowAddTransactionMenu(false)
  }
  const onQuantityChange = (e: any) => {
    if (e.currentTarget.value == "" || !quantityRef.current || !userData || selectedCoin == "" || price == undefined) {
      setQuantity(0)
      setTotal(0)
      return
    }
    const quantity = parseFloat(e.currentTarget.value)
    const maxQuantity = transaction.coin == selectedCoin  ? userData.coins[selectedCoin] - transaction.quantity < 0 ? 0 : userData.coins[selectedCoin] - transaction.quantity : userData.coins[selectedCoin];
    if (quantity > maxQuantity && transactionType == "sell") {
      setQuantity(maxQuantity)
      quantityRef.current.value = maxQuantity
      setTotal(maxQuantity * price)
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
  return (
    <div className={className}>
      <div className="w-full flex flex-row text-2xl gap-3">
        <div className="w-1/2  flex flex-col gap-3">
          <label>Quantity</label>
          <input type="number" min={0} onChange={onQuantityChange} ref={quantityRef} disabled={selectedCoin == "" ? true : false}
            className="w-full noarrows py-4 px-5 border border-gray-400 shadow-md shadow-gray-300 rounded-lg focus:outline-blue-400" placeholder="0.00" />
        </div>
        <div className="w-1/2  flex flex-col gap-3">
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
      <button className="text-4xl flex justify-center items-center text-white font-semibold bg-pink-900 rounded-2xl w-full shadow-md shadow-gray-300 py-5 hover:scale-[1.02] transition" onClick={onClickSaveTransaction}>
        {
          loading ? (
            <div className="w-9 h-9 border-4 rounded-[50%] border-b-transparent rotate" />
          ) : (
            <>
              Save transaction
            </>
          )
        }
      </button >
      <button onClick={onClickDelete} className="text-4xl flex justify-center items-center text-white font-semibold bg-red-700 rounded-2xl w-full shadow-md shadow-gray-300 py-5 hover:scale-[1.02] transition">
        Delete transaction
      </button>
    </div >
  )
}

export default EditTransaction;
