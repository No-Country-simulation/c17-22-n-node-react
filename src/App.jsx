import { Routes, Route, useLocation } from "react-router-dom"
import NavBar from "./Components/NavBar/NavBar"
import Home from "./pages/Home/Home"
import { CreateProject } from "./pages/CreateProject/CreateProject"
import { ProjectsView } from "./pages/ProjectsView/ProjectsView"
import ViewProject from "./Components/ViewProject/ViewProject"
import LoginForm from "./Components/LoginForm/LoginForm"
import RegisterForm from "./Components/RegisterForm/RegisterForm"
import Error404 from "./Components/Error404/Error404"
import Footer from "./Components/Footer/Footer"

function App() {
	const location = useLocation()
	const showNavbarAndFooter = () =>
		!["/login", "/register"].includes(location.pathname)

	return (
		<>
			{showNavbarAndFooter() && <NavBar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/projectsView" element={<ProjectsView />} />

				<Route path="/createProject" element={<CreateProject />} />
				<Route path="/project/:projectId" element={<ViewProject />} />

				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />

				<Route path="*" element={<Error404 />} />
			</Routes>
			{showNavbarAndFooter() && <Footer />}
		</>
	)
}

export default App
