import React, { useEffect, useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import List from "@mui/material/List";
import { Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FeedItem from "./FeedItem";
import { Divider } from "@mui/material";
import Header from "./Header";
import { fetchPosts } from "../redux/features/postsSlice";
import { AnyAction } from "@reduxjs/toolkit";

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

	const feed = useAppSelector((state) => state.posts.posts);

	return (
		<Box sx={{ height: "100%", position: "relative" }}>
			<Header />
			<List
				sx={{
					width: "90%",
					bgcolor: "background.paper",
					height: "100%",
					marginTop: "3%",
					padding: "30px",
				}}
			>
				{feed.length ? (
					feed.map((post) => {
						return <FeedItem key={post.guid} post={post} />;
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
			<Button>Add post</Button>
			<Pagination
				count={10}
				variant="outlined"
				sx={{ position: "absolute", left: "2%", top: "8%", padding: "15px" }}
				onChange={handlePagination}
			/>
		</Box>
	);
};

export default FeedComponent;
