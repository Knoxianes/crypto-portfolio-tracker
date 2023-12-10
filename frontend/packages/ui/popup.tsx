import type { FC } from "react"

type Props = {
    className?: string,
    text: string,
    setPopUpActive: (value: boolean) => void,
}


const PopUP: FC<Props> = (props) => {
    const onClick = () => {
        props.setPopUpActive(false)
    }
    return (
        <div className={props.className}>
            <p className="h-2/3 w-full px-6 py-10 text-center flex justify-center items-center"><span className="align-middle">{props.text}</span></p>
            <div className="h-1/3 w-full p-8 flex justify-center items-center">
                <button  className="w-1/4 hover:scale-105 focus:scale-105 p-4 text-white bg-green-700 transition rounded-lg shadow-gray-500 shadow-md" onClick={onClick} type="button">
                    Close
                </button>
            </div>
        </div>
    )
}
export default PopUP;
