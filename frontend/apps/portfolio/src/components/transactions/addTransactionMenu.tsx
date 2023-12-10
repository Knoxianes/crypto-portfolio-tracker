import { FC, useState } from "react"
import Header from "./header"
import Search from "./search"
import AddTransaction from "./addTransaction"
import {  UserDataType, TransactionType } from "../../consts/types"

type Props = {
  className?: string
  onClickClose: (value: boolean) => void
  userData: UserDataType | undefined
  setUserData: (value : UserDataType) => void
  transactions: TransactionType[]
  setTransactions: (value: TransactionType[]) => void
}

const AddTransactionMenu: FC<Props> = ({ className, onClickClose, userData, setUserData, transactions, setTransactions }) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [transactionType, setTransactionType] = useState("buy");
  return (
    <div className={className}>
      <div className="w-1/3  flex flex-col p-12 bg-white rounded-3xl shadow-lg shadow-gray-500 gap-10">
        <Header title="Add transaction" className="h-[7%] w-full flex flex-row items-center justify-between" onClickClose={onClickClose} />
        <Search userData={userData} setSelectedCoin={setSelectedCoin} className="w-full flex flex-col justify-between items-center gap-10" selectedCoin={selectedCoin} transactionType={transactionType} setTransactionType={setTransactionType}/>
        <AddTransaction setShowAddTransactionMenu={onClickClose} userData={userData} setUserData={setUserData} transactions={transactions} setTransactions={setTransactions} selectedCoin={selectedCoin} transactionType={transactionType} className="w-full flex flex-col gap-10" />
      </div>
    </div>
  )
}

export default AddTransactionMenu;
