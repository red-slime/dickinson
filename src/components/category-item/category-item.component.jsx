import { Link } from "react-router-dom";
import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
	const { imageUrl, title, projectUrl } = category;
	return (
		<div className="category-component-container">
			<div className="category">
				<img src={imageUrl} alt={title} />
				<Link to={`projects/${projectUrl}`}>
					<button>View Project</button>
				</Link>
			</div>
			<h2>{title}</h2>
		</div>
	);
};

export default CategoryItem;
