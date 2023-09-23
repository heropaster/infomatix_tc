import React, { useState } from "react";

import { searchItems } from "../../../utils/Search";
import styles from "./Search.module.scss";

import { Product } from "../../../types/Product";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader/Loader";

interface SearchProps {
	url: string;
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Search: React.FC<SearchProps> = ({ url, setProducts }) => {
	const [isSearching, setIsSearching] = useState(false);
	const [searchErrorMessage, setSearchErrorMessage] = useState<string | null>(
		null
	);

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
			.then(async (response) => {
				const data = await response.json();
				console.log(data);
				if (data.total === 0) {
					setSearchErrorMessage("Продуктов не найдено!");
					setTimeout(() => {
						setSearchErrorMessage(null); // Очищаем сообщение об ошибке через 2 секунды
					}, 2000);
				} else {
					setProducts(data.products);
				}
				setIsSearching(false);
			});
	};
	return (
		<>
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
				{isSearching && <Loader className="searchLoader" />}
			</div>
			{searchErrorMessage && (
				<div className={styles.errorMessage}>{searchErrorMessage}</div>
			)}
		</>
	);
};
export default Search;
