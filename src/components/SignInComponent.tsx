//@ts-nocheck
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { baseUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/features/userSlice";

export default function SignInComponent() {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);

		try {
			const { data } = await baseUrl.post("auth/login", {
				username: form.get("username"),
				password: form.get("password"),
			});

			if (data.access_token) {
				dispatch(setToken(data.access_token));
				navigate("/feed");
			}
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
					Sign in
				</Typography>

				{error && (
					<Typography component="h1" variant="h5" color="error">
						{error}
					</Typography>
				)}
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						onFocus={() => setError("")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onFocus={() => setError("")}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
