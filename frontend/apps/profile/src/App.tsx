import {  useEffect, useState } from "react"
import { Navbar, Menu, Profile, Security } from "./components"
import { getCookie } from "ui"
import { UserDataType } from "./consts/types"

function App() {
  const [userData, setUserData] = useState<UserDataType>()
  const [menuSelected, setMenuSelected] = useState("profile")

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
    fetchUserData().catch(console.error)
  }, [])
  const loadMenu = () => {
    if (menuSelected == "profile") {
      return (
        <Profile userData={userData} setUserData={setUserData}/>
      )
    } else if (menuSelected == "security") {
      return (
        <Security />
      )
    } 
  }
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex overflow-x-hidden">
      <Navbar className=" w-[97%] h-[10%] text-gray-700 absolute top-2 left-[1.5%] flex justify-start items-center flex-row p-10 gap-10 border-2 border-gray-300 bg-slate-200 rounded-lg shadow-lg shadow-gray-500 z-10" userData={userData} />
      <Menu menuSelected={menuSelected} setMenuSelected={setMenuSelected} className=" px-2 py-6 gap-8 flex items-center justify-between  flex-col w-[15%] h-[83%] text-gray-700 absolute top-[14%] left-[1.5%]  border-2 border-gray-300 bg-slate-200 rounded-lg shadow-lg shadow-gray-500 z-10" />
      <div className="w-[80.5%] h-[83%] absolute top-[14%] left-[18%] z-10 flex items-center justify-start">
        {
          loadMenu()
        }
      </div>
    </div>
  )
}

export default App
