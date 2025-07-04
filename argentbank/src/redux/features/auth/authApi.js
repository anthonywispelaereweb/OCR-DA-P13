import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/user/login',
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useLoginMutation } = authApi
