import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
	text: string;
	action: () => void;
	className: string;
	disabled: boolean;
}
const Button: React.FC<ButtonProps> = ({
	text,
	action,
	className,
	disabled,
}) => {
	return (
		<button
			onClick={action}
			className={`${styles[className]} ${styles.btn}`}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
