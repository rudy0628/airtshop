import { configureStore } from '@reduxjs/toolkit';
import ticketsSlice from './tickets-slice';
import authSlice from './auth-slice';

const store = configureStore({
	reducer: {
		tickets: ticketsSlice.reducer,
		auth: authSlice.reducer,
	},
});

export default store;
