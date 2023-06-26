import React from "react";
import { PostI } from "../redux/features/postsSlice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Divider, Button } from "@mui/material";

interface FeedItemProps {
	post: PostI;
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
	return (
		<ListItem alignItems="center" sx={{ maxWidth: "70%" }}>
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
			<Button>Del</Button>
		</ListItem>
	);
};

export default FeedItem;
