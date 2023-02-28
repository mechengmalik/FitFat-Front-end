import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useCookies } from 'react-cookie';


const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      console.log(getState(), "in prepareHeaders");

      const token = getState().auth.token;
      console.log(token, "in prepareHeaders");

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('allllllll gooooooooood',headers);

      }else{
        console.log('not working');

      }
      return headers;
    },
  }),
  
  endpoints: (builder) => ({

    fetchUser: builder.query({
      providesTags:['User'],
      query: () => {
          return {
              url: '/login',
              
              method: 'GET',
          };
      },
  }),


    login: builder.mutation({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
      // transformResponse: (response) => response.token.toString(),
    }),

    signup: builder.mutation({
      invalidatesTags:['User'],
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),


    logout: builder.mutation({
      invalidatesTags:['User'],
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      // transformResponse: (response) => response.data,
    }),
  }),
 

});



export const { useLoginMutation, useSignupMutation, useLogoutMutation,useFetchUserQuery } = authApi;
export {authApi}