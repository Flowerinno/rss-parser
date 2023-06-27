import { combineReducers, Reducer } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, { UserI } from "./features/userSlice";
import postsReducer, { PostsI } from "./features/postsSlice";
import modalReducer from "./features/modalSlice";

const persistConfig = {
	key: "root",
	storage,
};

export interface RootState {
	user: UserI;
	posts: PostsI;
	modal: { isOpen: boolean };
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
	user: userReducer,
	posts: postsReducer,
	modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (): {
	store: ReturnType<typeof configureStore>;
	persistor: Persistor;
} => {
	const store: any = configureStore({
		reducer: persistedReducer,
	});

	const persistor = persistStore(store);
	return { store, persistor };
};
