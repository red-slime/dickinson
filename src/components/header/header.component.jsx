import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import MobileLogo from "../../assets/logo-mobile.png";
import Hamburger from "../../assets/icons/bars-solid.svg";
import Exit from "../../assets/icons/xmark-large-solid.svg";
import FacebookSVG from "../../assets/icons/facebook.svg";
import InstagramSVG from "../../assets/icons/instagram.svg";
import "./header.styles.scss";

const Header = () => {
	const location = useLocation();

	const getLink = (path) => {
		return location.pathname === path ? "active-link" : "";
	};

	const getBackground = (path) => {
		return location.pathname === path ? "mobile-gray" : "";
	};

	const scrollToBottom = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const setBodyStyle = () => {
			document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
		};

		const handleResize = () => {
			if (window.innerWidth > 768) {
				closeMenu();
			}
			setBodyStyle();
		};

		window.addEventListener("resize", handleResize);
		setBodyStyle();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isMenuOpen]);

	const toggleMenu = () => {
		setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const handleHamburgerClick = () => {
		toggleMenu();
	};

	const handleLinkClick = () => {
		closeMenu();
	};

	return (
		<Fragment>
			<div className="header-container">
				<div className="header">
					<div className="logo-container">
						<Link to="/dickinson">
							<img
								className="desktop"
								src={Logo}
								alt="logo"
								onClick={handleLinkClick}
							/>
							<img
								className="mobile"
								src={MobileLogo}
								alt="mobile-logo"
								onClick={handleLinkClick}
							/>
						</Link>
					</div>
					<div className="nav-container">
						<img
							className="hamburger"
							src={isMenuOpen ? Exit : Hamburger}
							alt="hamburger-menu"
							onClick={handleHamburgerClick}
							style={{
								transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
							}}
						/>

						<nav>
							<ul className="chalet">
								<li>
									<Link to="/projects" className={getLink("/projects")}>
										Projects
									</Link>
								</li>
								<li>
									<Link to="/about" className={getLink("/about")}>
										About
									</Link>
								</li>
								<li>
									<a href="#contact" onClick={scrollToBottom}>
										Contact
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
			<div
				className={`mobile-menu ${getBackground("/about")}`}
				style={{ display: isMenuOpen ? "block" : "none" }}
			>
				<nav>
					<ul className="chalet">
						<div className="bar"></div>
						<li>
							<Link to="/projects" onClick={handleLinkClick}>
								Projects
							</Link>
						</li>
						<div className="bar"></div>
						<li>
							<Link to="/about" onClick={handleLinkClick}>
								About
							</Link>
						</li>
						<div className="bar"></div>
					</ul>
					<div className="header-footer">
						<div className="location">
							<a
								rel="noreferrer"
								target="_blank"
								href="https://www.google.com/maps/dir/33.4883981,-82.0951792/Dickinson+Architects/@33.505979,-82.1056209,12z/"
							>
								771 Broad Street, Suite 200<br></br>
								Augusta, Georgia 30901
							</a>
						</div>
						<div className="contact">
							<a href="mailto:mail@dickinsonarchitects.com">
								mail@dickinsonarchitects.com
							</a>
							<a href="tel:(706) 722-7488">706.722.7488</a>
						</div>
						<div className="socials">
							<a
								rel="noreferrer"
								target="_blank"
								href="https://www.facebook.com/DickinsonArchitectsPC/"
							>
								<img src={FacebookSVG} alt="facebook-icon" />
							</a>
							<a
								rel="noreferrer"
								target="_blank"
								href="https://www.instagram.com/dickinson_architects/"
							>
								<img src={InstagramSVG} alt="instagram-icon" />
							</a>
						</div>
					</div>
				</nav>
			</div>
		</Fragment>
	);
};

export default Header;
