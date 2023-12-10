import { useState } from "react"

function App() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const token = window.location.pathname.split('/')[2]
    const response = await fetch(`/forgotpassword/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: e.target[0].value
      })
    });
    const data = await response.json();
    const message = data["message"];
    if (message == "error") {
      alert("Server error");
      return;
    }
    setLoading(false);
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-4xl ">
      <form onSubmit={onSubmit} className="flex justify-center items-center child:w-full child-focus:outline-none child:transition-transform child-focus:scale-105 flex-col gap-8 child:shadow-md child:shadow-gray-400 child:px-6 child:py-6">
        <input type="password" placeholder="New password" className="border-2 border-gray-300" />
        <button type="submit" className="bg-pink-900 text-white hover:scale-105 flex justify-center items-center">
          {
            !loading && <>Reset password</>
          }
          {
            loading && <div className="w-10 h-10 border-4 rounded-[50%] border-b-transparent rotate" />
          }
        </button>
      </form>
    </div>
  )
}

export default App
