import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

export interface PostI {
	creator?: string;
	title?: string;
	link?: string;
	pubDate?: string;
	dcCreator?: string;
	content: string;
	contentSnippet: string;
	categories?: string[] | string;
	guid?: string;
	isoDate?: string;
}

export type PostsI = {
	posts: PostI[] | [];
	modifiedPosts: PostI[] | [];
};

const initialState: PostsI = {
	posts: [],
	modifiedPosts: [],
};

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (count: number | null) => {
		const { data } = await baseUrl.get(`posts?count=${count}`);
		return data;
	}
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			//here we would want to make like a loading spinner or smth, depends
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts = action.payload;
			state.modifiedPosts = action.payload;
		});
		builder.addCase(fetchPosts.rejected, (state, action) => {
			return;
		});
	},
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
