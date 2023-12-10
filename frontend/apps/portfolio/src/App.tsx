import { useEffect, useState } from "react"
import { Navbar, Transactions, Portfolio, AddTransactionMenu, EditTransactionMenu } from "./components"
import { getCookie } from "ui"
import { UserDataType, TransactionType } from "./consts/types";



function App() {
  const [userData, setUserData] = useState<UserDataType>();
  const [showAddTransactionMenu, setShowAddTransactionMenu] = useState(false);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [showEditTransactionMenu,setShowEditTransactionMenu] = useState(false);
  const [transaction,setTransaction] = useState<TransactionType>()


  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie("token");
      const userData = JSON.parse(sessionStorage.getItem("userData") as string) as UserDataType
      if (!userData) {
        const response = await fetch(`/api/userdata/${token}`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        setUserData(data.userData as UserDataType);
        sessionStorage.setItem("userData", JSON.stringify(data.userData))
        return
      }
      setUserData(userData)
    }
    const fetchTransactions = async () => {
      const token = getCookie("token");
      const transactions = JSON.parse(sessionStorage.getItem("transactions") as string) as TransactionType[] 
      if (!transactions){
        const response = await fetch(`/api/transactions/${token}`);
        const data = await response.json();
        if (data.message == "error") {
          alert("Server error")
          return
        }
        data.transactions.sort((a:TransactionType,b:TransactionType) => b.date - a.date)
        setTransactions(data.transactions as TransactionType[]);
        sessionStorage.setItem("transactions",JSON.stringify(data.transactions))
        return
      }
      setTransactions(transactions)
    }
    fetchTransactions().catch(console.error);

    fetchUserData().catch(console.error);
  }, [])

  return (
    <div className={`w-full h-screen  ${showAddTransactionMenu || showEditTransactionMenu ? " fixed overflow-hidden":""}`}>
      {
        showAddTransactionMenu && <AddTransactionMenu transactions={transactions} setTransactions={setTransactions} userData={userData} setUserData={setUserData} className="w-screen h-screen top-0 left-0 fixed flex justify-center items-center bg-gray-600/60 z-20 " onClickClose={setShowAddTransactionMenu} />
      }
      {
        showEditTransactionMenu && <EditTransactionMenu transaction={transaction as TransactionType} transactions={transactions} setTransactions={setTransactions} userData={userData} setUserData={setUserData} className="w-screen h-screen top-0 left-0 fixed flex justify-center items-center bg-gray-600/60 z-20 " onClickClose={setShowEditTransactionMenu} />
      }
      <Navbar className=" w-[97%] h-[10%] text-gray-700 absolute top-2 left-[1.5%] flex justify-start items-center flex-row p-10 gap-10 border-2 border-gray-300 bg-slate-200 rounded-lg shadow-lg shadow-gray-500 z-10" userData={userData} />
      <Transactions  className=" w-1/4 h-[90%] absolute top-[11%] left-0 p-10 z-10" setTransaction={setTransaction} setEditTransactionMenu={setShowEditTransactionMenu} showAddMenu={setShowAddTransactionMenu} transactions={transactions} />
      <Portfolio className=" absolute w-3/4 top-[11%] left-[25%] z-10 flex items-center flex-col gap-10 py-10 pr-10" userData={userData} />
    </div>
  )
}

export default App
