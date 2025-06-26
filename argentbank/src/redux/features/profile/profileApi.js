import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      console.log('token')
      console.log(token)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: builder => ({
    getProfile: builder.mutation({
      query: () => ({
        url: '/user/profile',
        method: 'POST'
      })
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: '/user/profile',
        method: 'PUT',
        body: data
      })
    })
  })
})

export const { useGetProfileMutation, useUpdateProfileMutation } = profileApi
