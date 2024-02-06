import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/authSlice/loginSignupSlice";
import { setCredentials } from "../../features/authSlice/logoutSetCredentialsSlice";
import { useDispatch } from "react-redux";
import { setPathName } from "../../features/pathSlice/rememberPathSlice";

const Login = () => {
  const [loginReq, loginRes] = useLoginMutation()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const payLoadData = {
        email: email,
        password: password,
      }
      const response = await loginReq({ payLoad: payLoadData })
      if (response.error) {
        setErrorMsg(response.error.data.message)
      } else {
        toast.success(response.data.message)
        dispatch(setCredentials({ token: response.data.token }))
        navigate(state?.from?.pathname || '/')
      }
    } else {
      toast.error("All fields are required")
    }
  };
  useEffect(() => {
    if (state?.from?.pathname) {
      dispatch(setPathName({ pathname: state?.from?.pathname }))
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value), setErrorMsg("") }} />
        <input type="text" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value), setErrorMsg("") }} />
        <button>Login</button>
        {
          errorMsg &&
          <div className="text-red-500">
            {errorMsg}
          </div>
        }
      </form>
      <Link to='/auth/register'>
        <button>Sign up</button>
      </Link>
    </div>
  )
}

export default Login