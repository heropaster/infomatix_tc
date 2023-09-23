import React from "react";

import star from "../../../assets/icons/starIcon.png";
import styles from "./Card.module.scss";

import { Product } from "../../../types/Product";

interface CardProps {
	product: Product;
	key: number;
}
const Card: React.FC<CardProps> = ({ product }) => {
	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<img src={product.thumbnail} alt={product.title} />
			</div>
			<div className={styles.card__content}>
				<h3>{product.title}</h3>
				<p>{product.description}</p>
				<p>
					Цена: <span className={styles.bold}>{product.price}</span>$
				</p>
				<p>
					Рейтинг:<span className={styles.bold}> {product.rating}</span>
					<img src={star} alt="rating" className={styles.star} />
				</p>
				<p>В наличии: {product.stock}</p>
				<p>
					Бренд:
					<span className={`${styles.bold} ${styles.brand}`}>
						{product.brand}
					</span>
				</p>
				<p>Категория: {product.category}</p>
			</div>
		</div>
	);
};
export default Card;
