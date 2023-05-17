import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({
	title,
	description,
	keywords,
	ogTitle,
	ogDescription,
	ogImage,
}) => {
	return (
		<Helmet>
			{/* Generic tags */}
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			{/* Open Graph tags */}
			<meta property="og:title" content={ogTitle} />
			<meta property="og:description" content={ogDescription} />
			<meta property="og:image" content={ogImage} />
		</Helmet>
	);
};

export default Meta;
