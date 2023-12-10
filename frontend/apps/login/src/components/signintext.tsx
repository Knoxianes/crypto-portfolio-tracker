import { FC } from 'react'

type Props = {
  className?: string
}

const SigninText: FC<Props> = (props) => {
  return(
    <div className = {props.className}>
      <h2 className='text-7xl '>Don't have an account?</h2>
      <p className='text-4xl text-center'>Enter your personal details <br/> and start using our application</p>
      <a href="/signup" className='text-3xl w-3/5 border-2 border-white p-4 text-center rounded-md hover:scale-105 transition-transform' >Create account</a>
    </div>
  )  
} 
export default SigninText
