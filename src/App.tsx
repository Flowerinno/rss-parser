import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { useAppSelector } from "./redux/hooks";
import { useNavigate } from "react-router-dom";
import Feed from "./pages/Feed";

function App() {
	const accessToken = useAppSelector((state) => state.user.token);
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate("/");
		}
	}, [accessToken, navigate]);

	return (
		<Routes>
			<Route element={<SignIn />} path="/" />
			<Route element={<Feed />} path="/feed" />
		</Routes>
	);
}

export default App;
