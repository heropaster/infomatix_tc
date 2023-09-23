import React, { useState } from "react";

import { searchItems } from "../../../utils/Search";
import styles from "./Search.module.scss";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";

interface SearchProps {
	url: string;
}

const Search: React.FC<SearchProps> = ({ url }) => {
	const [isSearching, setIsSearching] = useState(false);

	const [quest, setQuest] = useState("");
	const handleChange = (value: string) => {
		setQuest(value);
	};
	const handleClick = () => {
		setIsSearching(true);

		searchItems(url, quest)
			.then((response) => {
				setQuest("");
				return response;
			})
			.then(async (data) => {
				const response = await data.json();
				console.log(response);
				setIsSearching(false);
			});
	};
	return (
		<div className={styles.container}>
			<Input
				type="text"
				value={quest}
				onChange={(e) => {
					handleChange(e.target.value);
				}}
				placeholder="Напишите что хотите найти"
				className=""
			/>
			<Button
				text={"Поиск"}
				action={() => {
					handleClick();
				}}
				className="search"
				disabled={false}
			/>
			{isSearching && <Loader />}
		</div>
	);
};
export default Search;
