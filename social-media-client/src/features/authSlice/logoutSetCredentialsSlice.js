import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        initialState: { token: localStorage.getItem('token') || false, isLogedIn: localStorage.getItem('isLoggedIn') || false },
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload;
            state.token = token,
            state.isLogedIn = true;
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', true)
        },
        logout: (state) => {
            state.token = null;
            state.isLogedIn = false
        }
    }

})
export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUserToken = (state) => state.auth.token
export const selectIsLogedIn = (state) => state.auth.isLogedIn