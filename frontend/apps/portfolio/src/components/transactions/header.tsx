import {FC} from "react"
import { IoMdClose } from "react-icons/io";

type Props={
  className?: string
  onClickClose: (value:boolean) => void
  title: string
}
const Header:FC<Props> = ({className, onClickClose, title}) =>{
  return(
    <div className={className}>
      <h2 className="h-full text-5xl flex items-center font-bold">{title}</h2>
      <div className="flex items-center text-6xl hover:scale-110 transition cursor-pointer text-gray-400" onClick={() => onClickClose(false)}>
        <IoMdClose/>
      </div>
    </div>
  )
}

export default Header;
