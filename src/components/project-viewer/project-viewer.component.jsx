import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import usePageTransition from "../../transition.js";
import Paths from "../../routes/projects/paths.json";
import AngleDown from "../../assets/icons/angle-down-light.svg";
import AngleUp from "../../assets/icons/angle-up-light.svg";
import AngleLeft from "../../assets/icons/angle-left-light.svg";
import AngleRight from "../../assets/icons/angle-right-light.svg";
import ArrowLeft from "../../assets/icons/arrow-left-light.svg";
import ArrowRight from "../../assets/icons/arrow-right-light.svg";
import "./project-viewer.styles.scss";

const allProjects = Paths.flatMap(
	(category) => Object.values(category).flat()
	//.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
);

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

const loadImages = (directory) => {
	const images = [];

	for (const category in imageContexts) {
		const categoryImages = imageContexts[category]
			.keys()
			.filter((path) => path.startsWith(`./${directory}`));

		for (const imagePath of categoryImages) {
			const imageSrc = imageContexts[category](imagePath);
			images.push(imageSrc.default ? imageSrc.default : imageSrc);
		}
	}

	return images;
};

const Image = React.memo(({ src, alt, isActive, onClick }) => (
	<img
		src={src}
		alt={alt}
		className={isActive ? "active" : ""}
		onClick={onClick}
	/>
));

const calculateNextIndex = (currentIndex, delta, length) =>
	(currentIndex + delta + length) % length;

const ProjectViewer = () => {
	const transitionStyles = usePageTransition(300);
	const [featuredClass, setFeaturedClass] = useState("fade-in-right");

	const location = useLocation();
	const isAnyCategoryToggled = location?.state?.isAnyCategoryToggled;

	const sortedProjects = useMemo(() => {
		if (isAnyCategoryToggled) {
			return [...allProjects].sort(
				(a, b) => new Date(b.completionDate) - new Date(a.completionDate)
			);
		} else {
			return [...allProjects]; // Creates a new array identical to allProjects without sorting
		}
	}, [isAnyCategoryToggled]);

	const { directory } = useParams();
	const project = sortedProjects.find(
		(project) => project.directory === directory
	);

	const nextProject = useMemo(() => {
		const currentIndex = sortedProjects.findIndex(
			(project) => project.directory === directory
		);
		return sortedProjects[(currentIndex + 1) % sortedProjects.length];
	}, [directory]);

	const images = useMemo(
		() => loadImages(project.directory),
		[project.directory]
	);

	const [activeImg, setActiveImg] = useState(0);
	const [featuredSrc, setFeaturedSrc] = useState(images[0]);
	const collectionScroll = useRef(null);

	const [timeoutId, setTimeoutId] = useState(null);

	// Clear the timeout whenever the component unmounts or when the featuredSrc, activeImg change
	useEffect(() => {
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [featuredSrc, activeImg]);

	// Inside the callback function
	const handleSetActiveImage = useCallback(
		(imageSrc, index) => () => {
			setActiveImg(index);
			setFeaturedClass("fade-out-right");

			// Start the timeout and save the id in state
			const id = setTimeout(() => {
				setFeaturedSrc(imageSrc);
				setFeaturedClass("fade-in-right");
			}, 200);

			setTimeoutId(id);
		},
		[]
	);

	const handleUp = () => {
		if (window.innerWidth <= 768) {
			collectionScroll.current.scrollBy({
				left: -200,
				behavior: "smooth",
			});
		} else {
			collectionScroll.current.scrollBy({
				top: -200,
				behavior: "smooth",
			});
		}
	};

	const handleDown = () => {
		if (window.innerWidth <= 768) {
			collectionScroll.current.scrollBy({
				left: 200,
				behavior: "smooth",
			});
		} else {
			collectionScroll.current.scrollBy({
				top: 200,
				behavior: "smooth",
			});
		}
	};

	const handleCollectionScroll = () => {
		collectionScroll.current.scrollTop = 0;
	};

	const [loadedImages, setLoadedImages] = useState([]);

	useEffect(() => {
		const loadImagesAndUpdateState = () => {
			const newImages = loadImages(directory);
			setLoadedImages(newImages); // assuming you've stored images in a state variable
			setFeaturedSrc(newImages[0]);
			setActiveImg(0);
		};
		loadImagesAndUpdateState();
		window.scrollTo({
			top: 150,
			behavior: "smooth",
		});
	}, [directory]);

	const handleNext = () => {
		const nextImages = loadImages(nextProject.directory);
		setFeaturedSrc(nextImages[0]);
		setActiveImg(0);
	};

	const handleImageChange = useCallback(
		(delta) => {
			const currentIndex = images.findIndex((src) => src === featuredSrc);
			const nextIndex = calculateNextIndex(currentIndex, delta, images.length);

			setActiveImg(nextIndex);
			setFeaturedClass(delta > 0 ? "fade-out-right" : "fade-out-left");
			setTimeout(() => {
				setFeaturedSrc(images[nextIndex]);
				setFeaturedClass(delta > 0 ? "fade-in-right" : "fade-in-left");
			}, 200);
		},
		[images, featuredSrc]
	);

	const handleNextImage = useCallback(
		() => handleImageChange(1),
		[handleImageChange]
	);
	const handlePrevImage = useCallback(
		() => handleImageChange(-1),
		[handleImageChange]
	);
	// const handleSetActiveImage = useCallback(
	// 	(imageSrc, index) => () => {
	// 		setActiveImg(index);
	// 		setFeaturedClass("fade-out-right");
	// 		setTimeout(() => {
	// 			setFeaturedSrc(imageSrc);
	// 			setFeaturedClass("fade-in-right");
	// 		}, 200);
	// 	},
	// 	[]
	// );

	const nextProjectDirectory = useMemo(
		() => nextProject.directory,
		[nextProject]
	);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => handlePrevImage(),
		onSwipedRight: () => handleNextImage(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: false,
		trackTouch: true,
	});

	return (
		<div className="project-viewer-container">
			<div className="project" style={transitionStyles}>
				<div className="carousel">
					<div
						className="featured"
						style={{ width: images.length === 1 ? "100%" : undefined }}
					>
						<div
							className="arrow-container arrow-container-left"
							onClick={handlePrevImage}
							style={{ display: images.length === 1 ? "none" : "flex" }}
						>
							<img src={AngleLeft} alt="carousel-left-arrow" />
						</div>
						<img
							src={featuredSrc}
							alt={featuredSrc}
							className={featuredClass}
							{...swipeHandlers}
						/>
						<div
							className="arrow-container arrow-container-right"
							onClick={handleNextImage}
							style={{ display: images.length === 1 ? "none" : "flex" }}
						>
							<img src={AngleRight} alt="carousel-right-arrow" />
						</div>
					</div>
					<div
						className="collection-container"
						style={{ display: images.length === 1 ? "none" : "flex" }}
					>
						<div
							className="angle-container angle-container-top"
							onClick={handleUp}
						>
							<img src={AngleUp} alt="collection-up-arrow" />
						</div>
						<div className="collection" ref={collectionScroll}>
							{images.map((imageSrc, index) => (
								<Image
									key={imageSrc}
									src={imageSrc}
									alt={`${project.name} - ${index}`}
									isActive={activeImg === index}
									onClick={handleSetActiveImage(imageSrc, index)}
								/>
							))}
						</div>
						<div
							className="angle-container angle-container-bottom"
							onClick={handleDown}
						>
							<img src={AngleDown} alt="collection-down-arrow" />
						</div>
					</div>
				</div>
				<div className="project-info">
					<h2>{project.name}</h2>
					<span>{project.categoryStringOne}</span>
					<span>{project.categoryStringTwo}</span>
					<p className="project-description">{project.description}</p>
					<p>Completion Date: {project.completionDate}</p>
					{project.squareFootage && (
						<p>Square Footage: {project.squareFootage}</p>
					)}
				</div>
			</div>

			<div className="pagination">
				<div className="bar"></div>
				<div className="paginationButtons">
					<Link to="/projects/">
						<button>
							<img src={ArrowLeft} alt="all-projects" />{" "}
							<span>All Projects</span>
							<span>All</span>
						</button>
					</Link>
					<Link to={`/projects/${nextProjectDirectory}`}>
						<button
							onClick={() => {
								handleNext();
								handleCollectionScroll();
							}}
						>
							<span>Next Project</span>
							<span>Next</span>
							<img src={ArrowRight} alt="next-project" />
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectViewer;
