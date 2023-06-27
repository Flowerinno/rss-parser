import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import List from "@mui/material/List";
import { Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FeedItem from "./FeedItem";
import Header from "./Header";
import { fetchPosts } from "../redux/features/postsSlice";

const FeedComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts(1));
	}, [dispatch]);

	const handlePagination = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		dispatch(fetchPosts(value));
	};

	const { posts: feed, page } = useAppSelector((state) => state.posts);

	return (
		<Box sx={{ height: "100%", position: "relative" }}>
			<Header />
			<List
				sx={{
					width: "100%",
					bgcolor: "background.paper",
					height: "100%",
					marginTop: "3%",
					padding: "30px",
				}}
			>
				{feed?.length ? (
					feed.map((post) => {
						return <FeedItem key={post.id} post={post} />;
					})
				) : (
					<Button
						variant="outlined"
						sx={{ position: "absolute", left: "2%", bottom: "10%" }}
					>
						Failed to load the feed, let's try again!
					</Button>
				)}
			</List>
			<Pagination
				count={page}
				variant="outlined"
				sx={{ position: "absolute", left: "2%", top: "8%", padding: "15px" }}
				onChange={handlePagination}
			/>
		</Box>
	);
};

export default FeedComponent;
