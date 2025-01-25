import {useState} from 'react'
import Login from './Login'
import Register from './Register'

const SignModal = ({setIsCheckoutOpen}) => {
  const [isLogin, setIsLogin] = useState(true)
  const setLoginState = (value) => setIsLogin(value)
  return (
    isLogin ? <Login setLoginState={setLoginState} setIsCheckoutOpen={setIsCheckoutOpen} /> : <Register setLoginState={setLoginState} setIsCheckoutOpen={setIsCheckoutOpen} />
  )
}

export default SignModal