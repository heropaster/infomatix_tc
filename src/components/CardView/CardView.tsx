import React from "react";

import { Product } from "../../types/Product";

import Card from "./Card/Card";

import styles from "./CardView.module.scss";

interface CardViewProps {
	products: Product[];
}
const CardView: React.FC<CardViewProps> = ({ products }) => {
	return (
		<div className={styles.cardsContainer}>
			{products.map((product) => (
				<Card key={product.id} product={product} />
			))}
		</div>
	);
};

export default CardView;
