import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const gymApi = createApi({
    reducerPath: 'gym',
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
            fetchGyms: builder.query({
                providesTags:['Gym'],
                query: () => {
                    return {
                        url: '/gym',
                        // params: {

                        // },
                        method: 'GET',
                    };
                },
            }),
        
            addGym: builder.mutation({
                invalidatesTags:['Gym'],
                query: (payload) => {
                    return {
                        url: '/gym',
                        method: 'POST',
                        body:payload
                        
                    }
                }
            }),
        
        
            removeGym: builder.mutation({
                invalidatesTags:['Gym'],
                query: (gym) => {
                    return {
                        url: `/gym/${gym.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});
export const { useFetchGymsQuery, useAddGymMutation, useRemoveGymMutation } = gymApi;
export { gymApi };
