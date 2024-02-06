import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../features/authSlice/loginSignupSlice";


const Signup = () => {
  const [signupReq, signupRes] = useSignupMutation();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmPasword, setConfirmPasword] = useState();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      const payLoadData = {
        email: email,
        password: password,
        confirmPassword: confirmPasword,
        lastName: lastName,
        firstName: firstName,
      }
      const response = await signupReq({ payLoad: payLoadData })
      console.log(response)
      if (response.error) {
        setErrorMsg(response.error.data.message)
      } else {
        toast.success(response.data.message)
        navigate('/auth/verify-otp')
      }
    } else {
      toast.error("Something went wrong")
    }
  };


  return (
    <div>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Enter first name" onChange={(e) => { setFirstName(e.target.value), setErrorMsg("") }} />
        <input type="text" placeholder="Enter last name" onChange={(e) => { setLastName(e.target.value), setErrorMsg("") }} />
        <input type="text" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value), setErrorMsg("") }} />
        <input type="text" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value), setErrorMsg("") }} />
        <input type="text" placeholder="Enter your Confirm password" onChange={(e) => { setConfirmPasword(e.target.value), setErrorMsg("") }} />
        <button>Sign up</button>
        {
          errorMsg &&
          <div className="text-red-500">
            {errorMsg}
          </div>
        }
      </form>
      <Link to='/auth/login'>
        <button>Login</button>
      </Link>
    </div>
  )
}

export default Signup