import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { searchPosts } from "../redux/features/postsSlice";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
	name: string;
	setName: (name: string) => void;
}

const Header = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(searchPosts(e.target.value));
	};

	return (
		<>
			<AppBar position="relative" color="default">
				<Toolbar>
					<Typography
						variant="h4"
						sx={{ position: "absolute", left: 0, marginLeft: "2%" }}
					>
						AdminUI
					</Typography>
					<TextField
						size="small"
						sx={{ left: "20%" }}
						label="Search for posts"
						type="text"
						onChange={inputHandler}
					/>
					<ButtonGroup
						sx={{ position: "absolute", right: "2%", width: "max-content" }}
					>
						<Button
							onClick={() => navigate("/new-post")}
							color="info"
							variant="contained"
							sx={{ marginRight: 5 }}
						>
							Add post
						</Button>
						<Button key={2} value="logout" color="info" variant="contained">
							Logout
						</Button>
					</ButtonGroup>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
