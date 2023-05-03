import { useState, useEffect, useRef } from "react";
import "./footer.styles.scss";
import FacebookSVG from "../../assets/icons/facebook.svg";
import InstagramSVG from "../../assets/icons/instagram.svg";

const Footer = () => {
	const [isBottom, setIsBottom] = useState(false);
	const footerRef = useRef();

	useEffect(() => {
		const handleScroll = () => {
			const bottom =
				Math.ceil(window.innerHeight + window.scrollY) >=
				document.documentElement.scrollHeight;
			setIsBottom(bottom);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isBottom && window.location.hash === "#contact") {
			footerRef.current.classList.add("bottom-reached");
		} else {
			footerRef.current.classList.remove("bottom-reached");
		}
	}, [isBottom]);

	return (
		<div className="footer-container">
			<div className="footer" ref={footerRef}>
				<div className="bar"></div>
				<div className="information-container">
					<div className="lc-con">
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
			</div>
		</div>
	);
};

export default Footer;
