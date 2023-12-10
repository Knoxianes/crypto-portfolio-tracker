import { FC } from "react"
import { navbaritems } from "../../consts/consts"
import { UserDataType } from "../../consts/types"

type Props = {
  className?: string
  userData: UserDataType | undefined
}
const Navbar: FC<Props> = ({className}) => {
  return (
    <div className={className}>
      <a href="/portfolio" className="text-6xl font-bold cursor-pointer text-black">Portfolio tracker</a>
      {
        navbaritems.map((item:any, number:any) => {
          return (
            <div key={item.name} className="flex justify-center items-end gap-10">
              <a href={item.link} className="text-5xl font-bold align-top cursor-pointer hover:scale-105 transition duration-300  ">
                {item.name.toUpperCase()}
              </a>
              <div className="text-6xl text-black cursor-default">
                  {number == navbaritems.length-1 ? <>&nbsp;</> : <>|</>}                
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Navbar
