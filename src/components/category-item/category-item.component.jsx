import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
	const { imageUrl, title } = category;
	return (
		<div className="category-component-container">
			<div className="category">
				<img src={imageUrl} alt={title} />
				<button>View Project</button>
			</div>
			<h2>{title}</h2>
		</div>
	);
};

export default CategoryItem;
