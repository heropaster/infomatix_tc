import React from "react";

import Button from "../Button/Button";
import { generatePageNumbers } from "../../../utils/generatePages";
import styles from "./Pagination.module.scss";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pageNumbers = generatePageNumbers(totalPages);

	const handleClick = (step: string) => {
		if (step === "prev") {
			onPageChange(currentPage - 1);
		} else onPageChange(currentPage + 1);
	};
	return (
		<div className={styles.container}>
			<Button
				text={"Предыдущая"}
				action={() => handleClick("prev")}
				className="control"
				disabled={currentPage === 1}
			/>
			<ul className={styles.pagination}>
				{pageNumbers.map((pageNumber) => (
					<li
						key={pageNumber}
						onClick={() => {
							onPageChange(pageNumber);
						}}
						className={`${styles.paginationBtn} ${
							currentPage === pageNumber ? styles.active : ""
						}`}
					>
						{pageNumber}
					</li>
				))}
			</ul>
			<Button
				text={"Предыдущая"}
				action={() => handleClick("next")}
				className="control"
				disabled={currentPage === totalPages}
			/>
		</div>
	);
};
export default Pagination;
