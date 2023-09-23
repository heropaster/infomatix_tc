import { Product } from "../types/Product";


export const compareProducts = (a: Product, b: Product, field: keyof Product, order: string) => {
  const valueA = a[field];
  const valueB = b[field];

  let comparison = 0;

  if (valueA > valueB) {
    comparison = 1;
  } else if (valueA < valueB) {
    comparison = -1;
  }

  if (order === "desc") {
    comparison *= -1;
  }

  return comparison;
};