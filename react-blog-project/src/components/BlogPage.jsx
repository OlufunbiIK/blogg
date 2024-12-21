/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BlogCards from "./BlogCards";
import Pagination from "./Pagination";
import Paginations from "./Pagination";

export default function BlogPage() {
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 12; //blogs per page
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [activeCategory, setActiveCategory] = useState(null);
	useEffect(() => {
		async function fetchBlogs() {
			let url =
				"http://localhost:9000/blogs?pages=${currentPage}&limit=${pageSize}";

			// if filter by category
			if (selectedCategory) {
				url += `$category="${selectedCategory}`;
			}
			const response = await fetch(url);
			const data = await response.json();
			setBlogs(data);
		}
		fetchBlogs();
	}, [currentPage, pageSize, selectedCategory]);

	//page changing button
	function handlePageChange(pageNumber) {
		setCurrentPage(pageNumber);
	}

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		setCurrentPage(1);
		setActiveCategory(category);
	};
	return (
		<div>
			{/* category section */}
			<div>Page Category</div>

			{/* blogCards section */}
			<div>
				<BlogCards
					blogs={blogs}
					currentPage={currentPage}
					selectedCategory={selectedCategory}
					pageSize={pageSize}
				/>
			</div>

			{/* paginations */}
			<div>
				<Paginations
					onPageChange={handlePageChange}
					currentPage={currentPage}
					blogs={blogs}
					pageSize={pageSize}
				/>
			</div>
		</div>
	);
}
