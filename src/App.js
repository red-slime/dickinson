import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Outlet,
} from "react-router-dom";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ProjectViewer from "./components/project-viewer/project-viewer.component";
import Home from "./routes/home/home.component";
import Projects from "./routes/projects/projects.component";
import About from "./routes/about/about.component";
import NoPage from "./components/404/404.component";

Bugsnag.start({
	apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
	plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const App = () => {
	Bugsnag.notify(new Error("Test error"));
	return (
		<ErrorBoundary>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} index />
					<Route path="projects" element={<Projects />}>
						<Route path="*" element={<NoPage />} />
					</Route>
					<Route path="projects/:directory" element={<ProjectViewer />} />
					<Route path="about" element={<About />} />
					<Route path="*" element={<NoPage />} />
				</Routes>
				<Outlet />
				<Footer />
			</Router>
		</ErrorBoundary>
	);
};

export default App;
