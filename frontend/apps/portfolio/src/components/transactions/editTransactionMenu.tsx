import { FC, useState } from "react"
import Header from "./header"
import EditSearch from "./editsearch"
import EditTransaction from "./editTransaction"
import {  UserDataType, TransactionType } from "../../consts/types"

type Props = {
  className?: string
  onClickClose: (value: boolean) => void
  userData: UserDataType | undefined
  setUserData: (value : UserDataType) => void
  transactions: TransactionType[]
  setTransactions: (value: TransactionType[]) => void
  transaction: TransactionType
}

const EditTransactionMenu: FC<Props> = ({ className, onClickClose, userData, setUserData, transactions, setTransactions, transaction }) => {
  const [selectedCoin, setSelectedCoin] = useState(transaction.coin);
  const [transactionType, setTransactionType] = useState(transaction.quantity < 0 ? "sell" : "buy");
  return (
    <div className={className}>
      <div className="w-1/3  flex flex-col p-12 bg-white rounded-3xl shadow-lg shadow-gray-500 gap-10">
        <Header title="Edit transaction" className="h-[7%] w-full flex flex-row items-center justify-between" onClickClose={onClickClose} />
        <EditSearch userData={userData} setSelectedCoin={setSelectedCoin} className="w-full flex flex-col justify-between items-center gap-10" selectedCoin={selectedCoin} transactionType={transactionType} setTransactionType={setTransactionType}/>
        <EditTransaction transaction={transaction} setShowAddTransactionMenu={onClickClose} userData={userData} setUserData={setUserData} transactions={transactions} setTransactions={setTransactions} selectedCoin={selectedCoin} transactionType={transactionType} className="w-full flex flex-col gap-10" />
      </div>
    </div>
  )
}

export default EditTransactionMenu;
