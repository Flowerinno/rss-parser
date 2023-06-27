import React from "react";
import { PostI } from "../redux/features/postsSlice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Divider, Button, ButtonGroup } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { openDialog } from "../redux/features/modalSlice";
import { findPost } from "../redux/features/postsSlice";

interface FeedItemProps {
	post: PostI;
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
	const dispatch = useAppDispatch();

	const handleModal = (id: number = 1) => {
		dispatch(findPost(id));
		dispatch(openDialog(id));
	};

	return (
		<ListItem alignItems="center" sx={{ maxWidth: "70%", cursor: "pointer" }}>
			<ListItemText
				primary={post.title}
				secondary={
					<React.Fragment>
						<Typography
							sx={{ display: "inline" }}
							component="span"
							variant="body2"
							color="text.primary"
						>
							{post.creator}
						</Typography>
						{post.contentSnippet}
						<Divider />
						<Typography component="h5" variant="body1" color="text.secondary">
							{post.link}
						</Typography>
						<Divider />
					</React.Fragment>
				}
			/>
			<ButtonGroup sx={{ marginLeft: 5 }}>
				<Button onClick={() => handleModal(post.id)}>Edit</Button>
			</ButtonGroup>
		</ListItem>
	);
};

export default FeedItem;
