import { FC } from "react"
type Props = {
    className?: string
    setMenuSelected: (value: string) => void
    menuSelected: string
}

const Menu: FC<Props> = ({ className, setMenuSelected, menuSelected }) => {
    const onLogoutClick = async() =>{
        sessionStorage.clear();
        const result = await fetch("/logout");
        const data = await result.json();
        if(data.message == "error"){
            alert("server error");
            location.reload();
            return
        }
        location.reload();
    }
    return (
        <div className={className}>
            <div className="gap-8 flex items-center  flex-col w-full">
                <h2 className="w-full text-5xl font-bold text-center">Menu</h2>
                <div className="flex flex-col items-center w-full gap-4 text-4xl text-black font-semibold ">
                    <div className={`w-full h-12 cursor-pointer flex items-center px-4 py-7 rounded-xl ${menuSelected == "profile" ? "bg-gray-500/50" : ""}`} onClick={() => setMenuSelected("profile")}>
                        Profile
                    </div>
                    <div className={`w-full h-12 cursor-pointer flex items-center px-4 py-7 rounded-xl ${menuSelected == "security" ? "bg-gray-500/50" : ""}`} onClick={() => setMenuSelected("security")}>
                        Security
                    </div>
                </div>
            </div>
            <button className="w-3/4 bg-pink-900 text-3xl text-white py-2 rounded-lg hover:scale-105 transition shadow-md shadow-gray-300" onClick={onLogoutClick}>Logout</button>
        </div>
    )
}
export default Menu; 
