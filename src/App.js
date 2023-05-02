import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Outlet,
} from "react-router-dom";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ProjectViewer from "./components/project-viewer/project-viewer.component";
import Home from "./routes/home/home.component";
import Projects from "./routes/projects/projects.component";
import About from "./routes/about/about.component";

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path="projects" element={<Projects />} />
				<Route path="/projects/:directory" element={<ProjectViewer />} />
				<Route path="about" element={<About />} />
			</Routes>
			<Outlet />
			<Footer />
		</Router>
	);
};

export default App;
