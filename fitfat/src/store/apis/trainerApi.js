import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const trainerApi = createApi({
    reducerPath: 'trainer',
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
            fetchTrainers: builder.query({
                providesTags:['Trainers'],
                query: (gym) => {
                    return {
                        url: '/trainers',
                        params: {
                            gymId:gym.id,
                        },
                        method: 'GET',
                    };
                },
            }),
        
            addTrainer: builder.mutation({
                invalidatesTags:['Trainers'],
                query: (payload) => {
                    return {
                        url: '/trainers',
                       
                        method: 'POST',
                        body:payload
                        
                    }
                }
            }),
        
        
            removeTrainer: builder.mutation({
                invalidatesTags:['Trainers'],
                query: (trainer) => {
                    return {
                        url: `/trainers/${trainer.id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
});
export const { useFetchTrainersQuery,useAddTrainerMutation, useRemoveTrainerMutation } = trainerApi;
export { trainerApi };
