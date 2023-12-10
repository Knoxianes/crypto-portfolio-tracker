import { FC } from "react"
import Transaction from "./transaction";
import { TransactionType } from "../../consts/types";

type Props = {
  className?: string
  showAddMenu: (value: boolean) => void
  transactions: TransactionType[]
  setTransaction: (value:TransactionType)=>void
  setEditTransactionMenu: (value:boolean) => void
}
const Transactions: FC<Props> = ({ className, showAddMenu, transactions, setTransaction,setEditTransactionMenu }) => {

  return (
    <div className={className}>
      <div className="w-full h-full bg-slate-200   sticky top-[5%] left-0 border-2 border-gray-300 rounded-lg shadow-lg shadow-gray-500 flex flex-col p-4">
        <h2 className="w-full h-[7%] text-5xl font-semibold border-b-2 border-gray-300 pl-4 pt-4">Transactions</h2>
        <div className="w-full h-[7%] text-3xl text-center font-semibold border-b-2 border-gray-300 flex items-center justify-center ">
          <label className="w-1/5 h-full pt-4 ">Name</label>
          <label className="w-2/5 h-full pt-4 ">Quantity</label>
          <label className="w-2/5 h-full pt-4 ">Date</label>

        </div>
        <div className="w-full h-[78%] py-3 flex justify-start items-center flex-col noscrollbar overflow-y-scroll">
          {
            transactions.map((transaction, index) => { return (<Transaction setEditTransactionMenu={setEditTransactionMenu} setTransaction={setTransaction} transaction={transaction} key={`transaction-${index}`} />) })
          }
        </div>
        <div className="w-full h-[15%] flex justify-center items-end pb-6">
          <button className="w-4/5 py-4 text-4xl text-white bg-pink-900  hover:shadow-lg shadow-gray-500 rounded-lg transition hover:scale-105 font-medium" onClick={() => showAddMenu(true)} >Add transaction</button>
        </div>
      </div>
    </div>
  )
}

export default Transactions;


