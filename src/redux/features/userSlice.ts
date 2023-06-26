import { createSlice } from "@reduxjs/toolkit";

export interface UserI {
	username: string | null;
	token: string | null;
}

export const userState: UserI = {
	username: null,
	token: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: userState,
	reducers: {
		login: (state, action) => {
			const { username } = action.payload;
			state.username = username;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		reset: (state) => {
			state = userState;
		},
	},
});

export const { setToken, reset } = userSlice.actions;

export default userSlice.reducer;
