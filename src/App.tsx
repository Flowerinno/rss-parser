import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
	return (
		<Routes>
			<Route element={<SignIn />} path="/" />
			<Route />
		</Routes>
	);
}

export default App;
