const REGEXP = /^(\d+(?:\.\d+)?)(?:px)?$/;

export const getDomElementWidth = (element: HTMLElement): number => {
	const { width } = getComputedStyle(element);
	const result = width.match(REGEXP);

	if (!result) {
		throw new Error("Не удалось получить ширину");
	}

	const [, px] = result;

	return Number(px);
};