import { FC, useState, useRef } from "react"
import { setCookie } from "ui"

type Props = {
  className?: string
  setPopUP: (value: boolean) => void
  setEmail: (value: string) => void
}

const SigninForm: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  const [notVerified, setNotVerified] = useState(false);

  const email = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setBadLogin(false);
    setNotVerified(false);
    const response = await fetch("/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value
      })
    });
    e.target[1].value = "";
    const data = await response.json();
    const message = data["message"];
    if (message == "bad login") {
      setBadLogin(true);
      setLoading(false);
      return
    }
    if (message == "not verified") {
      setNotVerified(true);
      setLoading(false);
      return
    }
    if (message == "error") {
      alert("Server error");
      setLoading(false);
      return
    }
    setLoading(false);
    setCookie("token", message, 1825);
    document.location.pathname = "/portfolio";

  }
  const onForgotPasswordClick = async () => {
    const mail = email.current ? email.current.value : ""
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      alert("Please enter valid email")
      return
    }
    const response = await fetch("/forgotpassword", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: mail,
      })
    });
    const data = await response.json();
    const message = data["message"];
    if (message == "bad email") {
      alert("Account with this email doesn't exists. Please register first")
      return
    }
    if (message == "not verified") {
      setNotVerified(true);
      return
    }
    if (message == "error") {
      alert("Server error")
      return
    }
    props.setPopUP(true);
    props.setEmail(mail);
  }
  return (
    <div className={props.className} >
      <div className="flex h-[48%] justify-between items-center flex-col gap-4">
        <h1 className="w-full h-1/5 text-8xl text-black mx-auto text-center"> Sign In </h1>
        <div className="w-full h-3/5 text-2xl gap-6  flex justify-center items-center text-gray-300 flex-col mb-[-3rem] 
          child:w-full child:rounded-l child:border child:border-gray-500 child:p-2 child:shadow-gray-400 child:shadow-md child-focus:outline-none child-focus:scale-105 child:transition child:duration-150 child:ease-out ">
          <button>Signin with google</button>
          <button>Signin with binance</button>
        </div>
        <p className="w-full h-1/5 align-middle mx-auto text-center text-3xl text-gray-600 mb-[-2rem]">or sign in with your email</p>
      </div >
      {badLogin && <p className="text-2xl text-red-500 ml-4">Wrong email or password</p>}
      {notVerified && <p className="text-2xl text-red-500 ml-4">Email not verified <a href="/verify" className="underline">click here</a> to verify </p>}
      <form onSubmit={onSubmit}
        className={`flex w-full justify-start items-center flex-col h-[48%] text-3xl gap-8 child:px-6 
        child:py-5 child:rounded-l child:w-full child-focus:outline-none child-focus:scale-105 child:transition child:duration-150 child:ease-out ${badLogin ? "child:border-2 child:border-red-500" : "child:shadow-gray-500 child:shadow-md child:border child:border-gray-300"}`}>
        <input ref={email} type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="bg-pink-700 text-slate-100 hover:scale-105 transition ease-out duration-150 border-none flex justify-center items-center">
          {
            !loading && <>Sign in</>
          }
          {
            loading && <div className="w-9 h-9 border-4 rounded-[50%] border-b-transparent rotate" />
          }
        </button>
      </form>
      <div className="h-[4%] w-full mt-[-6.5rem] ">
        <p className="text-2xl text-blue-600 w-full text-left cursor-pointer hover:scale-105 hover:text-blue-400 transition" onClick={onForgotPasswordClick}>Forgot password?</p>
      </div>
    </div >
  )
}
export default SigninForm; 
