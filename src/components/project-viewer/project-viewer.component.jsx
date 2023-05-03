import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Paths from "../../routes/projects/paths.json";
import AngleDown from "../../assets/icons/angle-down-light.svg";
import AngleUp from "../../assets/icons/angle-up-light.svg";
import AngleLeft from "../../assets/icons/angle-left-light.svg";
import AngleRight from "../../assets/icons/angle-right-light.svg";
import ArrowLeft from "../../assets/icons/arrow-left-light.svg";
import ArrowRight from "../../assets/icons/arrow-right-light.svg";
import "./project-viewer.styles.scss";

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

const allProjects = Paths.flatMap((category) => Object.values(category).flat());

const Image = React.memo(({ src, alt, isActive, onClick }) => (
	<img
		src={src}
		alt={alt}
		className={isActive ? "active" : ""}
		onClick={onClick}
	/>
));

const ProjectViewer = () => {
	const [featuredClass, setFeaturedClass] = useState("fade-in-right");

	const { directory } = useParams();
	const project = allProjects.find(
		(project) => project.directory === directory
	);

	const nextProject = useMemo(() => {
		const currentIndex = allProjects.findIndex(
			(project) => project.directory === directory
		);
		return allProjects[(currentIndex + 1) % allProjects.length];
	}, [directory]);

	const images = useMemo(
		() => loadImages(project.directory),
		[project.directory]
	);

	const [activeImg, setActiveImg] = useState(0);
	const [featuredSrc, setFeaturedSrc] = useState(images[0]);
	const collectionScroll = useRef(null);

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

	const handleNext = () => {
		const nextImages = loadImages(nextProject.directory);
		setFeaturedSrc(nextImages[0]);
		setActiveImg(0);
	};

	const handlePrevImage = () => {
		const currentIndex = images.findIndex((src) => src === featuredSrc);
		const prevIndex = (currentIndex - 1 + images.length) % images.length;
		// setFeaturedSrc(images[prevIndex]);
		setActiveImg(prevIndex);
		setFeaturedClass("fade-out-left");
		setTimeout(() => {
			setFeaturedSrc(images[prevIndex]);
			setFeaturedClass("fade-in-left");
		}, 200);
	};

	const handleNextImage = () => {
		const currentIndex = images.findIndex((src) => src === featuredSrc);
		const nextIndex = (currentIndex + 1) % images.length;
		// setFeaturedSrc(images[nextIndex]);
		setActiveImg(nextIndex);
		setFeaturedClass("fade-out-right");
		setTimeout(() => {
			setFeaturedSrc(images[nextIndex]);
			setFeaturedClass("fade-in-right");
		}, 200);
	};

	const handleSetActiveImage = (imageSrc, index) => () => {
		// setFeaturedSrc(imageSrc);
		setActiveImg(index);
		setFeaturedClass("fade-out-right");
		setTimeout(() => {
			setFeaturedSrc(imageSrc);
			setFeaturedClass("fade-in-right");
		}, 200);
	};

	// const handleToggle = (cat) => {
	// 	setFeaturedClass("fade-out-right");
	// 	setTimeout(() => {
	// 		setFeaturedSrc(imageSrc);
	// 		setProjectsClass("fade-in-right");
	// 	}, 200);
	// };

	useEffect(() => {
		window.scrollTo({
			top: 150,
			behavior: "smooth",
		});
	}, [project]);

	if (!project) {
		return <div>Project not found.</div>;
	}

	return (
		<div className="project-viewer-container">
			<div className="project">
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
						<img src={featuredSrc} alt={featuredSrc} class={featuredClass} />
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
									key={index}
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
					<p>Square Footage: {project.squareFootage}</p>
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
					<Link to={`/projects/${nextProject.directory}`}>
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

/*
import React, { useState, useRef } from "react";

function DragComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseDown = (event) => {
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;

    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX - startX,
        y: event.clientY - startY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleMouseMove);
    });
  };

  return (
    <div
      ref={elementRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      Drag me
    </div>
  );
}

export default DragComponent;
*/
