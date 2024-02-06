import { apiSlice } from "../../app/api/apiSlice";


export const loginSignupSlice = apiSlice.injectEndpoints({
    tagTypes: ['token', 'login'],

    endpoints: builder => ({

        login: builder.mutation({
            query: (data) => ({
                url: `/auth/signin`,
                method: 'POST',
                body: data.payLoad
            }),
            providesTags: ['login'],
        }),

        signup: builder.mutation({
            query: (data) => ({
                url: `/auth/register`,
                method: 'POST',
                body: data.payLoad
            }),
            invalidatesTags: ['login'],
        }),

        otpVerify: builder.mutation({
            query: (data) => ({
                url:`/auth/verify-OTP`,
                method: 'POST',
                body: data.payLoad
            }),
            invalidatesTags: ['login'],
        }),


    })
})

export const {
    useLoginMutation,
    useSignupMutation,
    useOtpVerifyMutation,
} = loginSignupSlice