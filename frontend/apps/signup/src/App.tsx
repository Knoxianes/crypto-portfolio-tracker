import { PopUP } from "ui"
import { SignupForm, SignupText } from "./components"
import { useState} from "react"
import { popUpForgotPasswordText, popUpVerificaitonText } from "./const"



function App() {
  const [popUPVerification, setPopUPVerification] = useState(false);
  const [popUPForgotPassword, setPopUPForgotPassword] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full h-screen z-0 absolute top-0 left-0 overflow-hidden">
      {
        popUPVerification && <PopUP text={popUpVerificaitonText.replace("?", email)} setPopUpActive={setPopUPVerification} className="text-4xl bg-gray-100 absolute z-50 top-10 left-[5%] w-[90%] h-2/5 rounded-lg border-2 border-gray-300 shadow-md shadow-gray-600" />
      }{
        popUPForgotPassword && <PopUP text={popUpForgotPasswordText.replace('?', email)} setPopUpActive={setPopUPForgotPassword} className="text-4xl bg-gray-100 absolute z-50 top-10 left-[5%] w-[90%] h-2/5 rounded-lg border-2 border-gray-300 shadow-md shadow-gray-600" />
      }
      <div  className="w-1/2 h-screen absolute top-0 right-0 z-10" >
        <SignupForm className="w-full h-full px-60 py-40" setPopUP={setPopUPVerification} setEmail={setEmail} />
      </div>
      <div  className="w-1/2 h-screen absolute top-0 left-0 z-30">
        <SignupText className="w-full h-full flex justify-center items-center flex-col gap-[10.1rem] text-white px-32"  />
      </div>
      <div  className="w-1/2 h-screen absolute left-0 top-0 z-20 bg-pink-900"></div>
    </div>
  )
}

export default App
