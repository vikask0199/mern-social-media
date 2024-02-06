import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectIsLogedIn } from "../features/authSlice/logoutSetCredentialsSlice"


const RequireAuth = () => {
    const isLogedIn = useSelector(selectIsLogedIn) || localStorage.getItem("isLoggedIn")
    const location = useLocation();

    return (
        isLogedIn ? <Outlet /> : <Navigate to='/auth/login' state={{ from: location }} replace></Navigate>
    )
}

export default RequireAuth