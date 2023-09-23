import React from "react";

import styles from "./Input.module.scss";

interface InputProps {
	value: string;
	type: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className: string;
}

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	onChange,
	className,
	value,
}) => {
	return (
		<input
			value={value}
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			className={`${styles[className]} ${styles.input}`}
		/>
	);
};
export default Input;
