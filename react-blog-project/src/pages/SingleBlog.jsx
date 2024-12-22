import { useLoaderData } from "react-router-dom";

export default function SingleBlog() {
	const data = useLoaderData();
	console.log(data);
	return <div>SingleBlog</div>;
}
