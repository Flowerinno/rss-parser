import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeDialog } from "../redux/features/modalSlice";
import { TextField } from "@mui/material";
import {
	deletePost,
	removePost,
	editPost,
	updatePost,
} from "../redux/features/postsSlice";

const CustomizedDialog = () => {
	const { isOpen } = useAppSelector((state) => state.modal);

	const dispatch = useAppDispatch();

	const post = useAppSelector((state) => state.posts.post);

	if (!post) {
		dispatch(closeDialog());
	}

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setContent(post.contentSnippet);
		}
	}, [post]);

	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.contentSnippet);

	const handleSave = () => {
		dispatch(editPost({ id: post?.id, title, contentSnippet: content }));
		dispatch(updatePost({ id: post?.id, title, contentSnippet: content }));
		dispatch(closeDialog());
	};

	const handleDelete = () => {
		dispatch(removePost(post!.id));
		dispatch(deletePost(post!.id));
		dispatch(closeDialog());
	};

	const handleClose = () => {
		dispatch(closeDialog());
	};

	return (
		<Dialog
			open={isOpen}
			sx={{ width: "100%" }}
			maxWidth="md"
			fullWidth
			onClose={handleClose}
			data-testid="dialog"
		>
			<DialogTitle>
				<TextField
					sx={{ height: "max-content" }}
					type="text"
					multiline
					fullWidth
					label={"Title"}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</DialogTitle>
			<DialogContent dividers>
				<TextField
					type="text"
					multiline
					fullWidth
					label={"Content"}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</DialogContent>
			<DialogActions sx={{ backgroundColor: "#0288d1" }}>
				<Button
					data-testid="cancelButton"
					sx={{ color: "white", backgroundColor: "green" }}
					autoFocus
					onClick={handleSave}
				>
					Save
				</Button>
				<Button
					sx={{ color: "red", backgroundColor: "white" }}
					autoFocus
					onClick={handleDelete}
					data-testid="deleteButton"
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CustomizedDialog;
