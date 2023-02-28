import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gymApi } from "./apis/gymApi";
import { sessionApi } from "./apis/sessionApi";
import { trainerApi } from "./apis/trainerApi";
import { authApi } from "./apis/authApi";
import authSlice from './authSlice';



export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        [gymApi.reducerPath] : gymApi.reducer,
        [sessionApi.reducerPath] : sessionApi.reducer,
        [trainerApi.reducerPath] :trainerApi.reducer,
        [authApi.reducerPath] :authApi.reducer
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(gymApi.middleware)
        .concat(sessionApi.middleware)
        .concat(trainerApi.middleware)
        .concat(authApi.middleware);
    }
});

setupListeners(store.dispatch);

export{useFetchGymsQuery,useAddGymMutation,useRemoveGymMutation} from './apis/gymApi';
export{useFetchSessionsQuery,useAddSessionMutation ,useRemoveSessionMutation} from './apis/sessionApi';
export{useFetchTrainersQuery,useAddTrainerMutation,useRemoveTrainerMutation} from './apis/trainerApi';
export{useLoginMutation,useSignupMutation,useLogoutMutation,useFetchUserQuery} from './apis/authApi';
export {authSlice} 



