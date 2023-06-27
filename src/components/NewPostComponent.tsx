//@ts-nocheck
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../redux/hooks";
import { createPost } from "../redux/features/postsSlice";
import { v4 as uuidv4 } from "uuid";

export default function SignInComponent() {
	const [error, setError] = useState("");
	const [response, setResponse] = useState("");

	const dispatch = useAppDispatch();
	const randomData = {
		pubdate: uuidv4(),
		dcCreator: uuidv4(),
		guid: uuidv4(),
		isoDate: uuidv4(),
	};

	const handleSubmit = async (
		event: React.FormEventHandler<HTMLFormElement>
	) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		const obj = {
			creator: form.get("creator"),
			title: form.get("title"),
			link: form.get("link"),
			contentSnippet: form.get("contentSnippet"),
			content: form.get("content"),
			categories: form.get("categories"),
			...randomData,
		};
		try {
			dispatch(createPost(obj));
			setResponse("Successfully created a new post!");
		} catch (error) {
			setError("Failed to sign in.");
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					New post
				</Typography>
				{response && (
					<Typography component="h1" variant="h6" color="green">
						{response}
					</Typography>
				)}
				{error && (
					<Typography component="h1" variant="h6" color="error">
						{error}
					</Typography>
				)}
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1, maxWidth: 600 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						id="creator"
						label="creator"
						name="creator"
						autoFocus
						onFocus={() => setError("")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						id="title"
						label="title"
						name="title"
						autoFocus
						onFocus={() => setError("")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						id="contentSnippet"
						label="contentSnippet"
						name="contentSnippet"
						autoFocus
						onFocus={() => setError("")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						name="content"
						label="content"
						id="content"
						onFocus={() => setError("")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						name="categories"
						label="categories"
						id="categories"
						onFocus={() => setError("")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						name="link"
						label="link"
						id="link"
						onFocus={() => setError("")}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create post
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/feed" variant="body2">
								Back to Feed
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
