import { Link } from "react-router-dom";
import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
	const { imageUrl, title, projectUrl } = category;
	return (
		<div className="category-component-container">
			<Link to={`../projects/${projectUrl}`}>
				<div className="category">
					<img src={imageUrl} alt={title} />

					<button>View Project</button>
				</div>
				<h2>{title}</h2>
			</Link>
		</div>
	);
};

export default CategoryItem;
