import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function CustomizedDialog() {
	const isOpen = false;
	const dispatch = useAppDispatch();

	const handleClose = () => {};

	// useEffect(() => {}, [isOpen]);

	return (
		<div>
			<Dialog
				open={isOpen}
				sx={{ width: "100%" }}
				maxWidth="md"
				fullWidth
				onClose={handleClose}
				data-testid="dialogTitle"
			>
				<DialogTitle>123</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom></Typography>
				</DialogContent>
				<DialogActions sx={{ backgroundColor: "green" }}>
					<Button
						data-testid="cancelButton"
						sx={{ color: "white" }}
						autoFocus
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						sx={{ color: "red", backgroundColor: "white" }}
						autoFocus
						onClick={handleClose}
						data-testid="deleteButton"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
