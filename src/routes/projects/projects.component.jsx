import React, { useState, useEffect } from "react";
import Paths from "./paths.json";
import { Link } from "react-router-dom";
// import FilterIcon from "../../assets/icons/filter-list-regular.svg";
import "./projects.styles.scss";

// Remember scroll position
const useScrollPosition = (key) => {
	useEffect(() => {
		const storedScrollPosition = parseInt(localStorage.getItem(key));

		if (!isNaN(storedScrollPosition)) {
			window.scrollTo(0, storedScrollPosition);
		}

		const handleScroll = () => {
			localStorage.setItem(key, window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [key]);
};

const imageContexts = {
	commercial: require.context(
		"../../assets/projects/commercial",
		true,
		/\.(png|jpe?g|svg)$/
	),
	education: require.context(
		"../../assets/projects/education",
		true,
		/\.(png|jpe?g|svg)$/
	),
	healthcare: require.context(
		"../../assets/projects/healthcare",
		true,
		/\.(png|jpe?g|svg)$/
	),
	government: require.context(
		"../../assets/projects/government",
		true,
		/\.(png|jpe?g|svg)$/
	),
};

const Projects = () => {
	useScrollPosition("projects_page");

	const [displayedProjectsCount, setDisplayedProjectsCount] = useState(11);
	const loadMoreProjects = () => {
		setDisplayedProjectsCount(displayedProjectsCount + 11);
	};

	const [projectsClass, setProjectsClass] = useState("fade-in");

	const [toggled, setToggled] = useState({
		Healthcare: false,
		Government: false,
		Commercial: false,
		Education: false,
		HistoricPreservation: false,
		Hospitality: false,
		InteriorDesign: false,
	});

	const handleToggle = (cat) => {
		setProjectsClass("fade-out");
		setTimeout(() => {
			setToggled((prevState) => ({
				...prevState,
				[cat]: !prevState[cat],
			}));
			setProjectsClass("fade-in");
		}, 200);
	};

	const [loadButton, setLoadButton] = useState(false);

	useEffect(() => {
		const isAnyCategoryToggled = Object.values(toggled).some((val) => val);
		if (isAnyCategoryToggled) {
			setDisplayedProjectsCount(Infinity); // Show all projects when a category is toggled
			setLoadButton(true);
		} else {
			setDisplayedProjectsCount(11); // Reset to initial count when no category is toggled
			setLoadButton(false);
		}
	}, [toggled]);

	let projectCount = 0;

	//
	// Return
	//

	return (
		<div className="projects-component-container">
			<div className="work">
				<section className="intro">
					<div className="text">
						<p>
							In our 40 years of designing environments with superior spaces,
							Dickinson Architects has become a trusted partner in projects of
							all sizes and scopes. We inspire confidence from our clients
							because we believe every space should first and foremost serve
							those who occupy it.
						</p>
					</div>
					<div className="better">
						<h3>better spaces. better lives.</h3>
						<h3>better spaces.</h3>
						<h3>better lives.</h3>
						<p className="better-desktop">
							It's more than a promise to our clients. No matter the project
							type, it's a design philosophy that drives everything we do.
						</p>
						<p className="better-mobile">
							It's more than a promise to our clients. <br></br>No matter the
							project type, it's a design philosophy that drives everything we
							do.
						</p>
					</div>
				</section>
				<section className="projects">
					<div className="section-title">
						<h1>our projects</h1>
						<div className="bar"></div>
					</div>
					<div className="toggle-bar">
						{/* <div className="toggle">
							<img src={FilterIcon} alt="filter-icon" />
							<span>Filter</span>
						</div> */}
						<ul>
							<li
								className={toggled.Commercial ? "active" : ""}
								onClick={() => handleToggle("Commercial")}
							>
								Commercial
							</li>
							<li
								className={toggled.Education ? "active" : ""}
								onClick={() => handleToggle("Education")}
							>
								Education
							</li>
							<li
								className={toggled.Government ? "active" : ""}
								onClick={() => handleToggle("Government")}
							>
								Government
							</li>
							<li
								className={toggled.Healthcare ? "active" : ""}
								onClick={() => handleToggle("Healthcare")}
							>
								Healthcare
							</li>
							<li
								className={toggled.HistoricPreservation ? "active" : ""}
								onClick={() => handleToggle("HistoricPreservation")}
							>
								Historic Preservation
							</li>
							<li
								className={toggled.Hospitality ? "active" : ""}
								onClick={() => handleToggle("Hospitality")}
							>
								Hospitality
							</li>
							<li
								className={toggled.InteriorDesign ? "active" : ""}
								onClick={() => handleToggle("InteriorDesign")}
							>
								Interior Design
							</li>
						</ul>
					</div>
					<div className={`projects-container ${projectsClass}`}>
						{Paths &&
							Paths.map((category, categoryIndex) => {
								return Object.entries(category).map(([key, items]) => {
									items.sort(
										(a, b) =>
											new Date(b.completionDate) - new Date(a.completionDate)
									);
									return items.map((item) => {
										projectCount++;

										if (projectCount <= displayedProjectsCount) {
											const imageSrc = imageContexts[key](
												"./" + item.featuredImg
											);
											return (
												<div
													className={`project ${
														toggled[item.categoryOne] ||
														toggled[item.categoryTwo] ||
														!Object.values(toggled).some((val) => val)
															? ""
															: "hidden"
													} `}
													key={item.id}
												>
													<Link
														to={{
															pathname: "/projects/" + item.directory,
															state: { projects: items },
														}}
														key={item.id}
													>
														<div className="featured-photo">
															<img
																src={
																	imageSrc.default ? imageSrc.default : imageSrc
																}
																alt={item.name}
															/>
															<button>View Project</button>
														</div>
													</Link>

													<div className="title">
														<Link
															to={"/projects/" + item.directory}
															key={item.id}
														>
															<h3>{item.name}</h3>
														</Link>
													</div>
													<div className="categories">
														<div className="cat-container">
															<span>{item.categoryStringOne}</span>
															<span>{item.categoryStringTwo}</span>
														</div>
													</div>
												</div>
											);
										} else {
											return null;
										}
									});
								});
							})}
					</div>
					<div className="load-more-container">
						<div
							className={`button-bar ${loadButton ? "hide-button-bar" : ""}`}
						></div>
						<button
							onClick={loadMoreProjects}
							className={`load-more ${loadButton ? "hide-button-bar" : ""}`}
						>
							LOAD MORE
						</button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Projects;
