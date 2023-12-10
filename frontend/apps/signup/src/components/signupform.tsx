import { FC,  useState } from "react"

type Props = {
  className?: string
  setPopUP: (value: boolean) => void
  setEmail: (value: string) => void
}


const SignupForm: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)
  const [badUsername, setBadUsername] = useState(false)
  const [badEmail, setBadEmail] = useState(false)

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setBadUsername(false);
    setBadEmail(false);
    const response = await fetch("/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      })
    });
    const data = await response.json();
    const message = data["message"];
    if (message == "bad username") {
      setBadUsername(true);
      return
    }
    if (message == "bad email") {
      setBadEmail(true);
      return
    }
    if (message == "error") {
      alert("Server error")
      return
    }
    setLoading(false);
    props.setEmail(e.target[1].value)
    props.setPopUP(true);
    e.target[0].value = "";
    e.target[1].value = "";
    e.traget[2].value = "";

  }
  return (
    <div className={props.className} >
      <div className="flex h-2/5 justify-between items-center flex-col gap-4">
        <h1 className="w-full h-1/5 text-8xl text-black mx-auto text-center"> Create account </h1>
        <div className="w-full h-3/5 text-2xl gap-6  flex justify-center items-center text-gray-300 flex-col mb-[-3rem] 
          child:w-full child:rounded-l child:border child:border-gray-500 child:p-2 child:shadow-gray-400 child:shadow-md child-focus:outline-none child-focus:scale-105 child:transition child:duration-150 child:ease-out ">
          <button>Signup with google</button>
          <button>Signup with binance</button>
        </div>
        <p className="w-full h-1/5 align-middle mx-auto text-center text-3xl text-gray-600 mb-[-7rem]">or sign up with your email</p>
      </div >
      <form onSubmit={onSubmit}
        className="flex w-full justify-start items-center flex-col h-3/5 text-3xl mt-24 gap-8 child:px-6 
        child:py-5 child:rounded-l child:w-full child:shadow-gray-500 child-focus:outline-none child-focus:scale-105 child:transition child:duration-150 child:ease-out ">
        
        {badUsername && <p className="text-2xl text-red-500 mb-[-3rem] ml-[-2rem]">Username already exists</p>}
        <input type="text" placeholder="Username" className={`${badUsername ? " border-2 shadow-none border-red-700" : "border shadow-md border-gray-300"}`} required />
        {badEmail && <p className="text-2xl text-red-500 mb-[-3rem] mt-[-2rem] ml-[-2rem]">Email already exists</p>}
        <input type="email" placeholder="Email" className={`${badEmail ? "border-2 shadow-none border-red-700" : "border shadow-md border-gray-300"}`} />
        <input type="password" placeholder="Password" className="border shadow-md border-gray-300" required />
        <button type="submit" className="bg-pink-700 text-slate-100 hover:scale-105 transition ease-out duration-150 border-none flex justify-center items-center border shadow-md border-gray-300">
          {
            !loading && <>Sign up</>
          }
          {
            loading && <div className="w-9 h-9 border-4 rounded-[50%] border-b-transparent rotate" />
          }

        </button>
      </form>
    </div >
  )
}
export default SignupForm;
