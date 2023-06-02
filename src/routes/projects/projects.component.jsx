import React, { useState, useEffect, useRef } from "react";
import Paths from "./paths.json";
import { Link, useLocation } from "react-router-dom";
import FilterIcon from "../../assets/icons/filter-list-regular.svg";
import usePageTransition from "../../transition.js";
import Meta from "../../components/Meta/meta.js";
import OgImage from "../../assets/projects/commercial/SRP/SRP (1).jpg";
import "./projects.styles.scss";

// Remember scroll position
const useScrollPosition = (key) => {
	useEffect(() => {
		const storedScrollPosition = parseInt(localStorage.getItem(key));

		if (!isNaN(storedScrollPosition)) {
			setTimeout(() => {
				window.scrollTo(0, storedScrollPosition);
			}, 0);
		}

		if (!isNaN(storedScrollPosition)) {
			window.scrollTo(0, storedScrollPosition);
		}

		const handleScroll = () => {
			localStorage.setItem(key, window.scrollY);
		};

		window.addEventListener("wheel", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
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
	government: require.context(
		"../../assets/projects/government",
		true,
		/\.(png|jpe?g|svg)$/
	),
	healthcare: require.context(
		"../../assets/projects/healthcare",
		true,
		/\.(png|jpe?g|svg)$/
	),
	historicPreservation: require.context(
		"../../assets/projects/historic-preservation",
		true,
		/\.(png|jpe?g|svg)$/
	),
	hospitality: require.context(
		"../../assets/projects/hospitality",
		true,
		/\.(png|jpe?g|svg)$/
	),
};

const Projects = () => {
	const transitionStyles = usePageTransition(300);

	const [displayedProjectsCount, setDisplayedProjectsCount] = useState(11);
	const loadMoreProjects = () => {
		setDisplayedProjectsCount(displayedProjectsCount + 11);
	};

	const location = useLocation();
	useEffect(() => {
		const previousPath = document.referrer;

		if (previousPath.endsWith("/")) {
			// Run your function here, as the user is navigating from the Home page
			window.scrollTo({
				top: 0,
				behavior: "smooth", // Optional, for smooth scrolling
			});
		}
	}, [location]);

	const scrollingContainerRef = useRef();
	const shouldScroll = useRef(true);

	useEffect(() => {
		if (window.innerWidth > 430) {
			return;
		}
		const scrollAmount = 1; // Adjust this value to change the scrolling speed
		const scrollInterval = 40; // Adjust this value to change the scrolling interval (in milliseconds)
		const scrollingList = scrollingContainerRef.current;
		let scrollPos = 0;
		let scrollForward = true;

		const scroll = () => {
			if (!shouldScroll.current) return;

			if (scrollForward) {
				scrollPos += scrollAmount;
				if (
					scrollPos + scrollingList.offsetWidth >=
					scrollingList.scrollWidth
				) {
					scrollForward = false;
				}
			} else {
				scrollPos -= scrollAmount;
				if (scrollPos <= 0) {
					scrollForward = true;
				}
			}

			scrollingList.scrollLeft = scrollPos;
		};

		const intervalId = setInterval(scroll, scrollInterval);

		const handleTouchStart = () => {
			shouldScroll.current = false;
			clearInterval(intervalId);
		};

		scrollingList.addEventListener("touchstart", handleTouchStart);

		return () => {
			clearInterval(intervalId);
			scrollingList.removeEventListener("touchstart", handleTouchStart);
		};
	}, []);

	useScrollPosition("projects_page");

	const [projectsClass, setProjectsClass] = useState("fade-in");

	const [toggled, setToggled] = useState(() => {
		const storedToggled = localStorage.getItem("toggled");
		return storedToggled ? JSON.parse(storedToggled) : null;
	});

	useEffect(() => {
		localStorage.setItem("toggled", JSON.stringify(toggled));
	}, [toggled]);

	const handleToggle = (cat) => {
		setProjectsClass("fade-out");
		setTimeout(() => {
			setToggled((prevToggled) => (prevToggled === cat ? null : cat));
			setProjectsClass("fade-in");
		}, 200);
	};

	const [loadButton, setLoadButton] = useState(false);

	const [isAnyCategoryToggled, setIsAnyCategoryToggled] = useState(false);

	useEffect(() => {
		const anyCategoryToggled = !!toggled;
		setIsAnyCategoryToggled(anyCategoryToggled);
		if (anyCategoryToggled) {
			setDisplayedProjectsCount(Infinity); // Show all projects when a category is toggled
			setLoadButton(true);
		} else {
			setDisplayedProjectsCount(11); // Reset to initial count when no category is toggled
			setLoadButton(false);
		}
	}, [toggled]);

	let projectCount = 0;
	let totalProjectsCount = 0;

	//
	// Return
	//

	return (
		<div className="projects-component-container">
			<Meta
				/* Generic Tags */
				title="Dickinson Architects | Projects"
				description="Better spaces. Better lives. We inspire confidence from our clients
							because we believe every space should first and foremost serve
							those who occupy it."
				keywords="dickinson, architects, augusta, ga, south carolina, projects, commercial, education, government, healthcare, historic, preservation, hospitality, interior, design"
				/* Open Graph Tags */
				ogTitle="Dickinson's Projects"
				ogDescription="We inspire confidence from our clients
							because we believe every space should first and foremost serve
							those who occupy it."
				ogImage={OgImage}
			/>
			<div className="work" style={transitionStyles}>
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
						<div className="toggle">
							<img src={FilterIcon} alt="filter-icon" />
							<span>Filter</span>
						</div>
						<div className="scrolling-container" ref={scrollingContainerRef}>
							<ul className="scrolling-list">
								<li
									className={toggled === "Commercial" ? "active" : ""}
									onClick={() => handleToggle("Commercial")}
								>
									Commercial
								</li>
								<li
									className={toggled === "Education" ? "active" : ""}
									onClick={() => handleToggle("Education")}
								>
									Education
								</li>
								<li
									className={toggled === "Government" ? "active" : ""}
									onClick={() => handleToggle("Government")}
								>
									Government
								</li>
								<li
									className={toggled === "Healthcare" ? "active" : ""}
									onClick={() => handleToggle("Healthcare")}
								>
									Healthcare
								</li>
								<li
									className={toggled === "HistoricPreservation" ? "active" : ""}
									onClick={() => handleToggle("HistoricPreservation")}
								>
									Historic Preservation
								</li>
								<li
									className={toggled === "Hospitality" ? "active" : ""}
									onClick={() => handleToggle("Hospitality")}
								>
									Hospitality
								</li>
								<li
									className={toggled === "InteriorDesign" ? "active" : ""}
									onClick={() => handleToggle("InteriorDesign")}
								>
									Interior Design
								</li>
							</ul>
						</div>
					</div>
					<div className={`projects-container ${projectsClass}`}>
						{Paths &&
							Paths.map((category) => {
								return Object.entries(category).map(([key, items]) => {
									items.sort(
										(a, b) =>
											new Date(b.completionDate) - new Date(a.completionDate)
									);
									return items.map((item) => {
										projectCount++;
										totalProjectsCount++;

										if (projectCount <= displayedProjectsCount) {
											const imageSrc =
												toggled === "InteriorDesign" && item.featuredImgInterior
													? imageContexts[key]("./" + item.featuredImgInterior)
													: imageContexts[key]("./" + item.featuredImg);

											return (
												<div
													className={`project ${
														toggled === item.categoryOne ||
														toggled === item.categoryTwo ||
														!toggled
															? ""
															: "hidden"
													} ${isAnyCategoryToggled ? "toggled-span" : ""}`}
													key={item.id}
												>
													<Link
														to={{
															pathname: "/projects/" + item.directory,
															state: {
																projects: items,
																isAnyCategoryToggled: isAnyCategoryToggled,
															},
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
							className={`button-bar ${loadButton ? "hide-button-bar" : ""} ${
								displayedProjectsCount >= totalProjectsCount
									? "hide-button-bar"
									: ""
							}`}
						></div>
						<button
							onClick={loadMoreProjects}
							className={`load-more ${loadButton ? "hide-button-bar" : ""} ${
								displayedProjectsCount >= totalProjectsCount
									? "hide-button-bar"
									: ""
							}`}
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
