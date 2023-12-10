import { FC } from "react"
import { TransactionType } from "../../consts/types"
import {logo} from "../../consts/consts";

type Props = {
  transaction: TransactionType
  setTransaction: (value:TransactionType)=>void
  setEditTransactionMenu: (value:boolean) => void
}



const Transaction: FC<Props> = ({transaction, setTransaction, setEditTransactionMenu}) => {
  const date = new Date(transaction?.date ? transaction.date : 0);
  const onClickTransacton = ()=>{
    setTransaction(transaction)
    setEditTransactionMenu(true)
  }
  return (
    <div  onClick={onClickTransacton} className="flex items-center w-full cursor-pointer text-3xl font-medium h-16 hover:shadow-md hover:shadow-gray-500 transition-shadow border-2 hover:border-gray-700 hover:rounded-lg my-2 ">
      <div className="w-1/5 flex justify-center items-center">
        <img src={logo[transaction.coin]} className="w-12 h-12" />
      </div>
      <div className="w-2/5 text-center">
        <p className={`${transaction.quantity > 0 ? "text-green-600":"text-red-600"}`}>{transaction.quantity}</p>
      </div>
      <div className="w-2/5 text-center">
        <p className="w-full text-gray-500">{`${date.getDate() < 10 ? "0"+date.getDate() : date.getDate()}.${date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1): date.getMonth()+1}.${date.getFullYear()}`}</p>
      </div>
    </div>
  )
}

export default Transaction; 
