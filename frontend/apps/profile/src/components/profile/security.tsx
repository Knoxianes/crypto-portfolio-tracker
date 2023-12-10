import { FC, useState } from "react"
import { getCookie } from "ui"

const Security: FC = () => {
    const [loading, setLoading] = useState(false)
    const onSubmit = async (e: any) => {
        e.preventDefault()
        if (e.target[0].value == "" || e.target[1].value == "") {
            alert("Please type password")
            return
        }
        setLoading(true)
        const token = getCookie("token")
        const response = await fetch(`/resetpassword/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldpassword: e.target[0].value,
                password: e.target[1].value
            })
        });
        const data = await response.json()
        setLoading(false)
        if (data.message == "error") {
            alert("Server error");
            return
        }
        if(data.message == "bad password"){
            alert("Wrong old password")
            return
        }
        e.target[0].value = "";
        e.target[1].value = "";
        location.reload();
    }
    return (
        <div className="w-full h-full flex flex-col px-10 pt-6 gap-10">
            <h2 className="text-5xl font-bold w-full border-b border-gray-400 pb-4">Security</h2>
            <div className="flex flex-col text-3xl p-6 gap-5">
                <h3 className="text-4xl font-semibold ">Reset password:</h3>
                <form className="flex flex-col gap-4 pl-5" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2 ">
                        <h3>Old password:</h3>
                        <input type="password" className="w-1/4 px-3 py-4 text-gray-500 border border-gray-500 shadow-md shadow-gray-300 font-semibold bg-gray-200 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <h3>New password:</h3>
                        <input type="password" className="w-1/4 px-3 py-4 text-gray-500 border border-gray-500 shadow-md shadow-gray-300 font-semibold bg-gray-200 rounded-xl" />
                    </div>
                    <button className="w-1/4 flex items-center justify-center text-white mt-5  bg-pink-900 text-4xl shadow-md shadow-gray-500 py-4 rounded-xl font-semibold hover:scale-[1.02] transition">
                        {
                            loading ? (
                                <div className="w-10 h-10 border-4 rounded-[50%] border-b-transparent rotate" />
                            ) : (
                                <>
                                    Reset
                                </>
                            )
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Security; 
