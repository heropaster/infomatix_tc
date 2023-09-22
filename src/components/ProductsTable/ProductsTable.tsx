import React, { useEffect, useState } from "react";

import styles from "./ProductsTable.module.scss";
import { Product } from "../../types/Product";
import { getData } from "../../utils/getData";
import ProductRow from "./ProductRow/ProductRow";

const ProductsTable = () => {
	const [limit, setLimit] = useState(10);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const loadMoreProducts = () => {
		setLimit(limit + 10);
	};
	useEffect(() => {
		getData("https://dummyjson.com/products", limit)
			.then(async (response) => {
				setIsLoading(true);
				const data = await response.json();
				return data;
			})
			.then((data) => {
				setIsLoading(false);
				console.log(data);
				setProducts(data.products);
			});
	}, []);
	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.loader}>Загрузка данных...</div>
			) : (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Название</th>
							<th>Описание</th>
							<th>Цена</th>
							<th>Рейтинг</th>
							<th>В наличии</th>
							<th>Бренд</th>
							<th>Категория</th>
							<th>Картинка</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<ProductRow key={product.id} product={product} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default ProductsTable;
