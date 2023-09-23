import React from "react";

import styles from "./Loader.module.scss";

interface LoaderProps {
	className: string;
}
const Loader: React.FC<LoaderProps> = ({ className }) => {
	return <div className={`${styles.loader} ${styles[className]}`}></div>;
};

export default Loader;
