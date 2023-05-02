import Directory from "../category-directory/category-directory.component";
import FeaturedImages from "./featured";

// A list of the featured projects shown on the Home page

const FeaturedList = () => {
	const categories = [
		{
			id: 1,
			title: "SRP Federal Credit Union",
			imageUrl: `${FeaturedImages.one}`,
		},
		{
			id: 2,
			title: "Premier Networx",
			imageUrl: `${FeaturedImages.two}`,
		},
		{
			id: 3,
			title: "Augusta University Fine Arts Center",
			imageUrl: `${FeaturedImages.three}`,
		},
		{
			id: 4,
			title: "East Central Regional Hospital",
			imageUrl: `${FeaturedImages.four}`,
		},
		{
			id: 5,
			title: "Jordan Trotter",
			imageUrl: `${FeaturedImages.five}`,
		},
		{
			id: 6,
			title: "Vocational Technical Magnet High School",
			imageUrl: `${FeaturedImages.six}`,
		},
		{
			id: 7,
			title: "Augusta Prep Science Building",
			imageUrl: `${FeaturedImages.seven}`,
		},
		{
			id: 8,
			title: "View All Projects",
			imageUrl: null,
		},
	];

	return <Directory categories={categories} />;
};

export default FeaturedList;
