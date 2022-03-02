import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
	title: '',
	message: '',
	isShow: false,
	flashMessage: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState: modalInitialState,
	reducers: {
		addModal(state, action) {
			state.title = action.payload.title;
			state.message = action.payload.message;
			state.isShow = true;
		},
		clearModal(state) {
			state.title = '';
			state.message = '';
			state.isShow = false;
		},
	},
});

export default modalSlice;
export const modalActions = modalSlice.actions;
