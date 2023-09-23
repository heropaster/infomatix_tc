import React, { useState } from "react";

import { searchItems } from "../../../utils/Search";
import Button from "../../UI/Button/Button";
import styles from "./Search.module.scss";

interface SearchProps {
	url: string;
}

const Search: React.FC<SearchProps> = ({ url }) => {
	const [quest, setQuest] = useState("");
	const handleChange = (value: string) => {
		setQuest(value);
	};
	const handleClick = () => {
		searchItems(url, quest).then((response) => {
			console.log(response);
		});
	};
	return (
		<div className={styles.container}>
			<input
				type="text"
				value={quest}
				onChange={(e) => {
					handleChange(e.target.value);
				}}
			/>
			<Button
				text={"Поиск"}
				action={() => {
					handleClick;
				}}
				className="search"
				disabled={false}
			/>
		</div>
	);
};
export default Search;
