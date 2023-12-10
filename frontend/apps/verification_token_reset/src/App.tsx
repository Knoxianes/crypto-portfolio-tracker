import { useState} from "react"

function App() {
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false);
  const [badEmail, setBadEmail] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setVerified(false);
    setBadEmail(false);
    setLoading(true);
    const response = await fetch(`/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: e.target[0].value
      })
    });
    const data = await response.json();
    const message = data["message"];
    if (message == "bad email") {
      setBadEmail(true);
    }
    if (message == "verified") {
      setVerified(true);
    }
    if (message == "error") {
      alert("Server error");
      return;
    }
    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-4 items-center text-4xl">
      {verified && <p className="text-red-500 text-3xl">This email is already verified!</p>}
      {badEmail && <p className="text-red-500 text-3xl">There is no registered account with this email!</p>}
      <form onSubmit={onSubmit} className="flex justify-center items-center child:w-full child-focus:outline-none child:transition-transform child-focus:scale-105 flex-col gap-8 child:shadow-md child:shadow-gray-400 child:px-6 child:py-6">
        <input type="email" placeholder="Email" className={`${badEmail || verified ? "border-2 border-red-500":"border-2 border-gray-300"}`} required />
        <button type="submit" className="bg-pink-900 text-white hover:scale-105 flex justify-center items-center">
          {
            !loading && <>Send verification mail</>
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
