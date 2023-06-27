import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

export interface PostI {
	id: number;
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
	post: PostI | null;
	page: number;
};

const initialState: PostsI = {
	posts: [],
	post: null,
	page: 1,
};

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (count: number | null) => {
		const { data } = await baseUrl.get(`posts?count=${count}`);
		return data;
	}
);

export const searchPosts = createAsyncThunk(
	"posts/searchPosts",
	async (title: string) => {
		const { data } = await baseUrl.get(`posts/search?title=${title}`);
		return data;
	}
);

export const createPost = createAsyncThunk("posts/createPost", async (obj) => {
	const { data } = await baseUrl.post(`posts`, obj);
	return data;
});

export const findPost = createAsyncThunk(
	"posts/findPost",
	async (id: number) => {
		const { data } = await baseUrl.get(`posts/${id}`);
		return data;
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (id: number) => {
		console.log(id);
		await baseUrl.delete(`posts/${id}`);
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async (obj: { id?: number; title?: string; contentSnippet?: string }) => {
		await baseUrl.post(`posts/update`, {
			...obj,
		});
	}
);
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		removePost: (state, action) => {
			const id = action.payload;
			state.posts = state.posts.filter((item) => {
				return item.id !== id;
			});
			state.post = null;
		},
		editPost: (state, action) => {
			const { id, ...rest } = action.payload;

			state.posts = state.posts.map((post) => {
				if (post.id === id) {
					return { ...post, ...rest };
				} else {
					return post;
				}
			});
			state.post = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			//here we would want to make like a loading spinner or smth, depends
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts = action.payload.posts;
			state.page = action.payload.page;
		});
		builder.addCase(fetchPosts.rejected, (state, action) => {
			return;
		});
		builder.addCase(searchPosts.fulfilled, (state, action) => {
			state.posts = action.payload.posts;
			state.page = action.payload.page;
		});
		builder.addCase(searchPosts.rejected, (state, action) => {
			return;
		});
		builder.addCase(findPost.fulfilled, (state, action) => {
			state.post = action.payload;
		});
		builder.addCase(findPost.rejected, (state, action) => {
			return;
		});
	},
});

export const { removePost, editPost } = postsSlice.actions;

export default postsSlice.reducer;
