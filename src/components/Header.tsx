import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

export interface HeaderProps {
	name: string;
	setName: (name: string) => void;
}

const Header = () => {
	return (
		<>
			<AppBar position="relative" color="default">
				<Toolbar>
					<Typography
						variant="h6"
						sx={{ position: "absolute", left: 0, marginLeft: "2%" }}
					>
						AdminUI
					</Typography>
					<TextField
						size="small"
						sx={{ left: "20%" }}
						label="Search for posts"
						variant="outlined"
					/>
					<Button
						key={2}
						value="logout"
						color="info"
						variant="contained"
						sx={{ position: "absolute", right: 0, marginRight: "2%" }}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
