import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openDialog: (state) => {
			state.isOpen = true;
		},
		closeDialog: (state) => {
			state.isOpen = false;
		},
	},
});

export const { openDialog, closeDialog } = modalSlice.actions;

export default modalSlice.reducer;
