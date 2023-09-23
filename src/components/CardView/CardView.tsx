import React, { useState, useEffect } from "react";

import { Product } from "../../types/Product";

// Компоненты
import Card from "./Card/Card";
import SortSelect from "./SortSelect/SortSelect";
// Стили
import styles from "./CardView.module.scss";
// Утилиты
import { compareProducts } from "../../utils/sortTable";
interface CardViewProps {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
const CardView: React.FC<CardViewProps> = ({ products, setProducts }) => {
	const [field, setField] = useState("");

	// Обработчик изменения сортировки
	const handleSortChange = (selectedOption: string) => {
		console.log(selectedOption);
		setField(selectedOption);
	};
	useEffect(() => {
		setProducts(sortProducts());
	}, [field]);

	const sortProducts = () => {
		// Если поле не задано(Первый вызов)
		console.log(field);
		if (!field) {
			return products;
		}
		// Копия массива
		const sorted = [...products];

		sorted.sort((productA, productB) => {
			return compareProducts(
				productA,
				productB,
				field as keyof Product,
				"desc"
			);
		});

		return sorted;
	};
	const sortOptions = [
		{ value: "title", label: "По названию" },
		{ value: "price", label: "По цене" },
		{ value: "rating", label: "По рейтингу" },
		{ value: "brand", label: "По бренду" },
		{ value: "category", label: "По категории" },
	];
	return (
		<div className={styles.cardsContainer}>
			<SortSelect
				options={sortOptions}
				onChange={handleSortChange}
				field={field}
			/>
			{products.map((product) => (
				<Card key={product.id} product={product} />
			))}
		</div>
	);
};

export default CardView;
