import React, { useId } from "react";

import styles from "./SortSelect.module.scss";

interface Option {
	value: string;
	label: string;
}
interface SortSelectProps {
	options: Option[];
	onChange: (selectedOption: string) => void; // Функция обратного вызова для передачи выбранного значения
	field: string;
}

const SortSelect: React.FC<SortSelectProps> = ({
	options,
	onChange,
	field,
}) => {
	const optionKey = useId();
	return (
		<div>
			<label htmlFor="sortSelect">Сортировать по </label>
			<select
				className={styles.select}
				id="sortSelect"
				value={field}
				onChange={(e) => {
					console.log(e.target.value);
					onChange(e.target.value);
				}} // Вызываем функцию обратного вызова с выбранным значением
			>
				{options.map((option) => (
					<option key={optionKey} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SortSelect;
