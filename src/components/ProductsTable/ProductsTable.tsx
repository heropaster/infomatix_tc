import { useEffect, useState, useRef } from "react";

import styles from "./ProductsTable.module.scss";
import { Product } from "../../types/Product";
import { getData } from "../../utils/getData";
import ProductRow from "./ProductRow/ProductRow";
import Pagination from "../UI/Pagination/Pagination";
const ProductsTable = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const totalProducts = useRef(0);
	const pageSize = 10; // Количество продуктов на странице

	// Локальный кэш для хранения данных страниц
	const [pageDataCache, setPageDataCache] = useState<{
		[page: number]: Product[];
	}>({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Есть ли сохраненные в кеше данные для текущей страницы
				if (pageDataCache[currentPage]) {
					console.log(pageDataCache[currentPage]);
					setProducts(pageDataCache[currentPage]);
				} else {
					setIsLoading(true);
					// Заголовок для скипа предыдущих продуктов
					const skip = (currentPage - 1) * pageSize;
					getData("https://dummyjson.com/products", pageSize, skip)
						.then(async (response) => {
							const data = await response.json();
							return data;
						})
						.then((data) => {
							console.log(data);
							// Сохранение страницы в кэше
							setPageDataCache((prevCache) => ({
								...prevCache,
								[currentPage]: data.products,
							}));
							totalProducts.current = data.total;
							setProducts(data.products);
							setIsLoading(false);
						});
				}
			} catch (error) {
				console.error("Ошибка загрузки данных", error);
			}
		};

		fetchData();
	}, [currentPage]); //Вызов useEffect в случае изменения currentPage

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};
	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.loader}>Загрузка данных...</div>
			) : (
				<div className={styles.content}>
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
								<th>Изображение</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<ProductRow key={product.id} product={product} />
							))}
						</tbody>
					</table>
				</div>
			)}
			{/* Во время загрузки пагинация скрывается */}
			{!isLoading && (
				<Pagination
					currentPage={currentPage}
					onPageChange={handlePageChange}
					totalPages={totalProducts.current / pageSize}
				/>
			)}
		</div>
	);
};
export default ProductsTable;
