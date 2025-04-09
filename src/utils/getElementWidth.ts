import { getDomElementWidth } from "./getDomElementWidth";

export const getElementWidth = (text: string, classNames: string = '') => {
	const tempElement = document.createElement("div");

	tempElement.className = classNames;
	tempElement.style.position = "absolute";
	tempElement.style.visibility = "hidden";
	tempElement.textContent = text;

	document.body.appendChild(tempElement);

	const width = getDomElementWidth(tempElement);

	document.body.removeChild(tempElement);

	return width;
};