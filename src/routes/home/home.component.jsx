import { Link } from "react-router-dom";
import FeaturedList from "../../components/featured-list/featured-list.component";
import "./home.styles.scss";

const Home = () => {
	return (
		<div className="home-component-container">
			<div className="home">
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
