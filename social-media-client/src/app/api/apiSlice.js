import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { logout } from '../../features/authSlice/logoutSetCredentialsSlice';


const baseQuery = fetchBaseQuery({
    baseUrl:  'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            console.log(import.meta.env.REACT_APP_API_BASE_URL)
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // if (result?.error?.originalStatus === 403) {
    //     console.log('sending refresh token')
    //     // send refresh token to get new access token 
    //     const refreshResult = await baseQuery('/refresh', api, extraOptions)
    //     console.log(refreshResult)
    //     if (refreshResult?.data) {
    //         const user = api.getState().auth.user
    //         // store the new token 
    //         api.dispatch(setCredentials({ ...refreshResult.data, user }))
    //         // retry the original query with new access token 
    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         api.dispatch(logOut())
    //     }
    // }
    // return result

    if (result?.error?.status === 401) {
        toast.info("Unauthorized access !")
        localStorage.removeItem('accessToken');
        api.dispatch(logout())
        return result
    }
    else if (result?.error?.status === 403) {
        toast.error("Access denied !")
    }

    else if (result?.error?.status === 'FETCH_ERROR') {
        toast.error('Server not responding please try after sometimes !')
    }

    return result

}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})