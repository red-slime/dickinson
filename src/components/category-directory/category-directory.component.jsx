import CategoryItem from "../category-item/category-item.component";
import "./category-directory.styles.scss";

const Directory = ({ categories }) => {
	return (
		<div className="directory-component-container">
			{categories.map((category) => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;
