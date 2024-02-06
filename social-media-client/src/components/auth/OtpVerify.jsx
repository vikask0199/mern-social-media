import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useOtpVerifyMutation } from "../../features/authSlice/loginSignupSlice";
import { setCredentials } from "../../features/authSlice/logoutSetCredentialsSlice";
import { setPathName } from "../../features/pathSlice/rememberPathSlice";



const OtpVerify = () => {
    const [email, setEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [otp, setOTP] = useState("")
    const [verifyReq, setVerifyRes] = useOtpVerifyMutation()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const navigate = useNavigate()
    const pathName = useSelector(state => state.path.pathName);
    console.log(pathName)

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp && email) {
            const payLoadData = {
                email: email,
                otp: otp
            }
            const response = await verifyReq({ payLoad: payLoadData })
            if (response.error) {
                setErrorMsg(response.error.data.message)
            } else {
                toast.success(response.data.message)
                dispatch(setCredentials({ token: response.data.token }))
                navigate(pathName || '/')
                dispatch(setPathName({ pathname: null }))
            }
        } else {
            toast.error("Something went wrong")
        }
    };



    return (
        <div>
            <form action="" onSubmit={handleVerifyOtp}>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" id="" placeholder="enter otp here" onChange={(e) => setOTP(e.target.value)} />
                <button>Verify OTP</button>
            </form>
            <Link to='/'>
                <button>Home</button>
            </Link>
            {
                errorMsg &&
                <div className="text-red-500">
                    {errorMsg}
                </div>
            }
        </div>
    )

}

export default OtpVerify