import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import usePageTransition from "../../transition.js";
import x from "../../assets/icons/xmark-large-solid.svg";
import Meta from "../../components/Meta/meta.js";
import OgImage from "../../assets/projects/commercial/SRP/SRP (3).jpg";
import "./about.styles.scss";

const Bio = memo(({ children }) => <p className="bio-break">{children}</p>);

const members = [
	{
		name: "Nick Dickinson, JR., AIA, NCARB",
		position: "CEO",
		imageUrl: require("./team-photos/nick-color.jpg"),
		bio: [
			<Bio key={1}>
				Better spaces mean better lives: that’s one of the many lessons I was
				fortunate enough to have learned from my mentor, father, and namesake.
				The training I received from my Dad, along with my degrees from Georgia
				Tech and 23 years of experience since, have shaped me into an architect
				well versed in a variety of design styles that I can apply to projects
				from renovations to new construction. I know that no single design
				approach is the right one for every client. That is why I allow the
				building program and context to direct design decisions.
			</Bio>,
			<Bio key={2}>
				A life-long resident of Richmond County, I am a Ramblin’ Wreck through
				and through, married to a diehard Alabama fan and now father to a
				Georgia Bulldog. Fall is a tough time in the Dickinson household, but I
				still hold out hope that my youngest son will make the right college
				choice.
			</Bio>,
			<Bio key={3}>
				#betterspacesbetterlives #helluvaengineer #letsgojackets
			</Bio>,
		],
	},
	{
		name: "Erin M. Armstrong, AIA, NCARB, LEED AP",
		position: "Partner",
		imageUrl: require("./team-photos/erin-color.jpg"),
		bio: [
			<Bio key={1}>
				Like good art, good architecture should make us think. I believe that
				buildings will tell you what they want to be if you listen hard enough,
				and I believe the built environment has the potential to engage us and
				make us appreciate where we are. These are the principles I have used to
				guide my career, much of which has been spent at Dickinson Architects. I
				interned at this firm between earning my Bachelor of Science at Georgia
				Tech and returned after I received my Master of Architecture, also from
				Tech, because I loved the idea of shaping my hometown’s sense of place.
			</Bio>,
			<Bio key={2}>
				I am a LEED Accredited Professional and an Augustan since the age of 2.
				My husband and I went to the same high school and college, but did not
				meet until our moms set us up on a date years later. Lesson learned:
				always listen to your mother, she knows what’s good for you… now if only
				I can convince my children of that fact!
			</Bio>,
			<Bio key={3}>#ispeakbuilding #raisingthinkers #futurearchitects</Bio>,
		],
	},
	{
		name: "David Watkins, AIA",
		position: "Associate",
		imageUrl: require("./team-photos/dave-color.jpg"),
		bio: [
			<Bio key={1}>
				I have always been fascinated by stories and have used my passion for
				creativity to take the narratives I see all around me to the next level.
				Since buildings tell the story of our culture and act as a stage for our
				lives, pursuing a career in architecture was the perfect fit for me. My
				time at Savannah College of Art and Design, where I received a Bachelor
				of Fine Arts and a Master of Architecture, sharpened my ability to bring
				all my ideas together and provided me with the tools to make my designs
				a reality.
			</Bio>,
			<Bio key={2}>
				I have been with Dickinson Architects for a decade now, and am fortunate
				to be able to influence how my hometown experiences the spaces around
				them. When I’m not working, I stay active and probably spend an
				unhealthy amount of time on the tennis court. My other hobbies include
				graphic design and disc golf.
			</Bio>,
			<Bio key={3}>#topspin #ratherplaytennis #revitguru</Bio>,
		],
	},
	{
		name: "Haleigh Watson, RID, IIDA",
		position: "Interior Designer",
		imageUrl: require("./team-photos/haleigh-color.jpg"),
		bio: [
			<Bio key={1}>
				I had always been interested in a career in Interior Design and, in high
				school in Dublin, Georgia, I was able to take classes that only
				furthered that interest. Once I received my bachelor’s degree in
				interior design from Georgia Southern University, I began my career at
				Dickinson Architects. I have been here 5 years, during which time I
				earned my Interior Designer registration and worked on projects of all
				shapes and sizes, from schools and offices to hotels and restaurants.
				Clients know they can trust me to bring their ideas to life, although
				I’ll always push the envelope and see how many colors I can incorporate
				into my designs. For me, design not only allows you to influence how a
				space will be enjoyed, but how it will be experienced.
			</Bio>,
			<Bio key={2}>
				When I’m not working on design projects, you can probably find me
				hanging out with the people I love most, including my husband, Drew, and
				our baby, a beautiful rescue dog named Layla Mae.
			</Bio>,
			<Bio key={3}>#gata #formfollowsfunction #newlywed</Bio>,
		],
	},
	{
		name: "Chris Gosnell, ASSOC, AIA",
		position: "Intern Architect",
		imageUrl: require("./team-photos/chris-color.jpg"),
		bio: [
			<Bio key={1}>
				I have had a passion and desire to create since I was a child. Much of
				my young life was spent in artistic pursuits and, during a high school
				drafting class, I became interested in a career in architecture. I
				graduated from the Boston Architectural College with a Bachelor of
				Architecture. Boston is overflowing with examples of great architecture
				and was an incredible place to earn a degree in the field. Once I
				graduated, my family and I decided to move to the south, and I began
				working for Dickinson Architects.
			</Bio>,
			<Bio key={2}>
				Outside of the office, I enjoy spending time with my wife and children.
				I still enjoy being creative and stay busy with animation projects,
				creating watercolors, or building woodworking projects.
			</Bio>,
			<Bio key={3}>#bostonarchitecturalcollege</Bio>,
		],
	},
	{
		name: "Ricardo Diaz",
		position: "BIM Designer",
		imageUrl: require("./team-photos/ricardo-color.jpg"),
		bio: [
			<Bio key={1}>
				I graduated from Augusta Technical College in 2014 with a degree in
				Architecture & Engineering Technology and was hired by Dickinson
				Architects shortly afterwards. I feel really fortunate to have been here
				for the past 8 years because I have learned so much that has allowed me
				to further my career and given me a deeper understanding of architecture
				and the building process. Working on a project and seeing it come to
				life brings a deep sense of pride to what I do, and I especially love
				sharing our work with others. The drone footage you see on our website
				is my creation (I’m an FAA certified drone operator) and gives me and
				others a real sense of the great designs our firm produces.
			</Bio>,
			<Bio key={2}>
				My interests outside of work include salsa dancing, anything outdoors,
				and spending time with my children. As said by H. Jackson Brown, Jr.,
				the best preparation for tomorrow is doing your best today.
			</Bio>,
			<Bio key={3}>#pr #danceislife #outdoors</Bio>,
		],
	},
	{
		name: "Amy Christian",
		position: "Business Development Director",
		imageUrl: require("./team-photos/amy-color.jpg"),
		bio: [
			<Bio key={1}>
				When I first began college at Georgia Southern in my hometown of
				Statesboro, I was an interior design major. Then I discovered a natural
				ability and love for storytelling that changed my career path. I spent
				the majority of my career working in the publishing business at
				newspapers and magazines, and have done marketing, development, and
				public relations work at nonprofits along the way. Now I get to tell the
				story of Dickinson Architects, which completes a circle I began in
				college.
			</Bio>,
			<Bio key={2}>
				When I’m not working, you can probably find me singing in the church
				choir, running, or herding the small zoo (two dogs, two cats) that my
				husband and I are left with now that our daughter has graduated from the
				University of South Carolina and moved to Charlotte. And if you happen
				to see me out running, chances are I will soon discover a stray animal.
				Seriously: it happens at least once a year.
			</Bio>,
			<Bio key={3}>#gata #dogperson #catperson #alltheanimals</Bio>,
		],
	},
	{
		name: "Jackie Parish",
		position: "Adminstrator",
		imageUrl: require("./team-photos/jackie-color.jpg"),
		bio: [
			<Bio key={1}>
				I have seen a lot of changes at Dickinson Architects in my 37 years with
				the firm and am proud to say that the firm and its management continues
				to improve on the technique and quality of the finished product. I feel
				like my administrative duties include taking care of our team members
				and I do this by creating handmade gifts to celebrate special occasions
				like birthdays, weddings, and graduations. I love giving gifts.
			</Bio>,
			<Bio key={2}>
				When I’m not making sure everything in the office runs smoothly, I’m
				probably quilting, crafting, or camping by a nearby lake.
			</Bio>,
			<Bio key={3}>#expertgiftgiver #wecouldntdoitwithouther #shestheboss</Bio>,
		],
	},
];

//const videoSrc = "https://i.imgur.com/bWGuz3C.mp4#t=17";

const About = () => {
	const transitionStyles = usePageTransition(300);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [activeIndex, setActiveIndex] = useState(null);
	const [prevActiveIndex, setPrevActiveIndex] = useState(null);
	const individualRefs = members.map(() => React.createRef());
	const teamContainerRef = useRef(null);

	const updateHeight = useCallback(() => {
		if (prevActiveIndex !== null && individualRefs[prevActiveIndex]) {
			const prevIndividual = individualRefs[prevActiveIndex].current;
			prevIndividual.style.height = "";
		}

		if (activeIndex !== null && individualRefs[activeIndex]) {
			const individual = individualRefs[activeIndex].current;
			const bio = individual.querySelector(".bio");

			if (bio.offsetHeight > individual.offsetHeight) {
				individual.style.height = `${bio.offsetHeight}px`;
			}
		} else if (activeIndex === null) {
			individualRefs.forEach((ref) => {
				if (ref && ref.current) {
					ref.current.style.height = "";
				}
			});
		}
	}, [activeIndex, prevActiveIndex, individualRefs]);

	useEffect(() => {
		updateHeight();
	}, [updateHeight]);
	//
	// Return
	//

	return (
		<div className="about-component-container">
			<Meta
				/* Generic Tags */
				title="Dickinson Architects | About"
				description="Better spaces. Better lives. Meet the team and learn more about the culture that drives us above expectations."
				keywords="dickinson, architects, augusta, ga, south carolina, projects, commercial, education, government, healthcare, historic, preservation, hospitality, interior, design"
				/* Open Graph Tags */
				ogTitle="About Dickinson"
				ogDescription="Meet the team and learn more about the culture that drives us above expectations."
				ogImage={OgImage}
			/>
			<div className="GrayFox"></div>
			<div className="about" style={transitionStyles}>
				<section className="intro">
					<div className="text">
						<p>
							The Dickinson Architects team believes every space should serve
							those who occupy it. The key to our intentionality is
							comprehension. We uphold the culture we've built by aiming to
							always meet standards above your expectations. Our expertise is
							rooted in the dedication we show to detail, the respect and
							loyalty we have for each other and our clients, and the joy we
							receive from sharing our legacy with the community.
						</p>
					</div>
					<div className="video">
						<div className="video-container">
							<iframe
								src="https://player.vimeo.com/video/818375642?h=f23a75542f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
								frameborder="0"
								allow="autoplay; fullscreen;"
								allowfullscreen
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									borderRadius: "15px",
								}}
								title="Dickinson Architects"
							></iframe>

							<script src="https://player.vimeo.com/api/player.js"></script>
							{/* <video controls>
								<source src={videoSrc} type="video/mp4" preload="metadata" />
								Your browser does not support the video tag.
							</video> */}
						</div>
					</div>
				</section>
				<section className="team" ref={teamContainerRef}>
					<div className="section-title">
						<h1>meet the team</h1>
						<div className="bar"></div>
					</div>
					<div className="team-container">
						{members.map(({ name, position, imageUrl, bio }, index) => (
							<div
								key={index}
								ref={individualRefs[index]}
								className={`individual ${
									activeIndex === index ? "active" : ""
								}`}
								onClick={() => {
									setPrevActiveIndex(activeIndex);
									setActiveIndex(activeIndex === index ? null : index);
									if (window.innerWidth > 768) {
										teamContainerRef.current.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
									}
								}}
							>
								<div className="bio">
									<div
										className="close-bio"
										onClick={(event) => {
											event.stopPropagation();
											setActiveIndex(null);
										}}
									>
										<img src={x} alt="x-icon" />
									</div>
									<div className="member-info">
										<h3>{name}</h3>
										<span>{position}</span>
									</div>
									<div className="build">{bio}</div>
								</div>

								<div className="member-photo">
									<img src={imageUrl} alt={name} />
								</div>
								<div className="member-info below">
									<h3>{name}</h3>
									<span>{position}</span>
								</div>
								<div className="mobileBio">
									{bio}
									<div className="abar"></div>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default About;
