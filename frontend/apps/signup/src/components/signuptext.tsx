import { FC } from 'react'

type Props = {
  className?: string
}

const SignupText: FC<Props> = (props) => {
  return(
    <div className = {props.className}>
      <h2 className='text-7xl '>Already have an account?</h2>
      <p className='text-4xl text-center'>Sign in with your personal details <br/> and start using our application</p>
      <a href="/" className='text-3xl w-3/5 border-2 border-white p-4 rounded-md hover:scale-105 transition-transform text-center' >Sign in</a>
    </div>
  )  
} 
export default SignupText
