import { configureStore } from '@reduxjs/toolkit';
import ticketsSlice from './tickets-slice';
import authSlice from './auth-slice';
import modalSlice from './modal-slice';

const store = configureStore({
	reducer: {
		tickets: ticketsSlice.reducer,
		auth: authSlice.reducer,
		modal: modalSlice.reducer,
	},
});

export default store;
