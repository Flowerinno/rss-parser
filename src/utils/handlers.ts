import { baseUrl } from "./api";

export const fetchFeed = async () => {
	const { data } = await baseUrl.get("posts");
	return data;
};
