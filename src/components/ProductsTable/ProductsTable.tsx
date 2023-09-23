import { useEffect, useState, useRef } from "react";

import styles from "./ProductsTable.module.scss";

import { Product } from "../../types/Product";
import { getData } from "../../utils/getData";
import { compareProducts } from "../../utils/sortTable";

import Loader from "../UI/Loader/Loader";
import ProductRow from "./ProductRow/ProductRow";
import Pagination from "../UI/Pagination/Pagination";
import Search from "./Search/Search";

const ProductsTable = () => {
	// Состояния для сортировки
	const [sortField, setSortField] = useState(""); //Имя столбца
	const [sortOrder, setSortOrder] = useState("asc"); //Направление сортировки

	// Состояния для загрузки данных
	const [products, setProducts] = useState<Product[]>([]); //Массив продуктов(Проверка на типы присутсвует)
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const totalProducts = useRef(0);

	// Константы
	const pageSize = 10; // Количество продуктов на странице
	const url = "https://dummyjson.com/products";

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
					getData(url, pageSize, skip)
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

	// Сортировка при клике
	const handleSortChange = (field: string) => {
		// Функция для смены поля сортировки
		if (field === sortField) {
			// Если выбрано текущее поле сортировки, меняем направление сортировки
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			// Если выбрано новое поле сортировки, сбрасываем направление сортировки к "asc"
			setSortField(field);
			setSortOrder("asc");
		}
		setProducts(sortProducts());
	};

	const sortProducts = () => {
		// Если поле не задано(Первый вызов)
		if (!sortField) {
			return products;
		}
		// Копия массива
		const sorted = [...products];

		sorted.sort((productA, productB) => {
			return compareProducts(
				productA,
				productB,
				sortField as keyof Product,
				sortOrder as "asc" | "desc"
			);
		});

		return sorted;
	};

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader className="mainLoader" />
			) : (
				<div>
					<Search url={url} setProducts={setProducts} />

					<table className={styles.table}>
						<thead>
							<tr>
								<th
									className={styles.sorting}
									onClick={() => handleSortChange("title")}
								>
									Название
									{sortField === "title" && (sortOrder === "asc" ? "▲" : "▼")}
								</th>
								<th>Описание</th>
								<th
									className={styles.sorting}
									onClick={() => handleSortChange("price")}
								>
									Цена
									{sortField === "price" && (sortOrder === "asc" ? "▲" : "▼")}
								</th>
								<th
									className={styles.sorting}
									onClick={() => handleSortChange("rating")}
								>
									Рейтинг
									{sortField === "rating" && (sortOrder === "asc" ? "▲" : "▼")}
								</th>

								<th>В наличии</th>
								<th
									className={styles.sorting}
									onClick={() => handleSortChange("brand")}
								>
									Бренд
									{sortField === "brand" && (sortOrder === "asc" ? "▲" : "▼")}
								</th>
								<th
									className={styles.sorting}
									onClick={() => handleSortChange("category")}
								>
									Категория
									{sortField === "category" &&
										(sortOrder === "asc" ? "▲" : "▼")}
								</th>
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
