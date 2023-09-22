import React from "react";
import { Product } from "../../../types/Product";
import styles from "./ProductRow.module.scss";
interface ProductRowProps {
	product: Product;
}
const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
	return (
		<tr>
			<td className={`${styles.cell}`}>{product.title}</td>
			<td className={`${styles.cell}`}>{product.description}</td>
			<td className={`${styles.cell}`}>{product.price}</td>
			<td className={`${styles.cell}`}>{product.rating}</td>
			<td className={`${styles.cell}`}>{product.stock}</td>
			<td className={`${styles.cell}`}>{product.brand}</td>
			<td className={`${styles.cell}`}>{product.category}</td>
			<td className={`${styles.cell} ${styles.image}`}>
				<img src={product.thumbnail} alt={product.title} />
			</td>
		</tr>
	);
};
export default ProductRow;
