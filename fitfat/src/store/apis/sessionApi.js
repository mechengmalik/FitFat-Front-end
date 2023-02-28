import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const sessionApi = createApi({
    reducerPath: 'session',
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
    endpoints(builder) {
        return {
            fetchSessions: builder.query({
                providesTags:['Session'],
                query: (gym) => {
                    return {
                        url: '/sessions',
                        params: {
                            gymId:gym.id,
                        },
                        method: 'GET',
                    };
                },
            }),
        
            addSession: builder.mutation({
                invalidatesTags:['Session'],
                query: (payload) => {
                    return {
                        url: '/sessions',
                        body:payload,
                        // params: {
                        //     gymId:gym.id
                            
                        // },
                        method: 'POST',
                        
                        
                    }
                }
            }),
        
        
            removeSession: builder.mutation({
                invalidatesTags:['Session'],
                query: (session) => {
                    return {
                        url: `/sessions/${session.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});
export const { useFetchSessionsQuery,useAddSessionMutation, useRemoveSessionMutation } = sessionApi;
export { sessionApi };
