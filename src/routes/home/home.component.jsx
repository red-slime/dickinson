import { Link } from "react-router-dom";
import usePageTransition from "../../transition.js";
import FeaturedList from "../../components/featured-list/featured-list.component";
import Meta from "../../components/Meta/meta.js";
import OgImage from "../../assets/projects/commercial/SRP/SRP (1).jpg";
import "./home.styles.scss";

const Home = () => {
	const transitionStyles = usePageTransition(300);
	return (
		<div className="home-component-container">
			<Meta
				/* Generic Tags */
				title="Dickinson Architects | Home"
				description="Better Spaces. Better Lives. No matter the project type, it's a design philosophy that drives everything we do."
				keywords="dickinson, architects, augusta, ga, south carolina, projects, commercial, education, government, healthcare, historic, preservation, hospitality, interior, design"
				/* Open Graph Tags */
				ogTitle="Dickinson Architects"
				ogDescription="No matter the project type, it's design philosophy that drives everything we do."
				ogImage={OgImage}
			/>
			<div className="home" style={transitionStyles}>
				<section className="home-one">
					<div className="mobile-splash"></div>
					<div className="splash">
						<div>
							<h1>
								better spaces.<br></br>better lives.
							</h1>
							<p className="philosophy">
								It's more than a promise to our clients.
								<br></br>
								No matter the project type, it's a design <br></br> philosophy
								that drives everything we do.
							</p>
							<p className="philosophy-mobile">
								It's more than a promise to our clients. No matter the project
								type, it's a design philosophy that drives everything we do.
							</p>
							<div>
								<Link to="/about">
									<button>Meet the team</button>
								</Link>
								<Link to="/projects">
									<button>View our projects</button>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className="home-two">
					<div className="section-title">
						<h1>our projects</h1>
						<div className="bar"></div>
					</div>
					<FeaturedList />
				</section>
			</div>
		</div>
	);
};

export default Home;
