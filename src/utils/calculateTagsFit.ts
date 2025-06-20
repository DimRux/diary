import { ITag } from "@components/Tag/Tag";
import { getElementWidth } from "./getElementWidth";
import styles from '@components/TagList/TagList.module.css'

/** Расстояние между тегами */
export const GAP = 8;

export const calculateTagsFit = (
	arr: ITag[] | undefined,
	widthTagsWrapper: number,
) => {
	if (!arr || arr.length === 0) {
		return [0, 0];
  }

	let usedWidth = 0;
	let visibleCount = 0;
	const totalTags = arr.length;

	const remainingElementWidth = getElementWidth(`+${totalTags}`, styles.tag);

	for (let i = 0; i < totalTags; i++) {
		const tagWidth = getElementWidth(`#${arr[i].name}`, styles.tag);
		const gapWidth = visibleCount > 0 ? GAP : 0;
		const requiredWidth = tagWidth + gapWidth;

		// Первый тег всегда отображается, даже если он очень длинный
		if (visibleCount === 0) {
			visibleCount = 1;
			usedWidth = tagWidth;
			continue;
		}

		const isLastTag = i === totalTags - 1;
		let totalRequired = usedWidth + requiredWidth;
		
		// Для всех тегов, кроме последнего, учитываем место под элемент оставшихся
		if (!isLastTag) {
			totalRequired += remainingElementWidth;
		}

		if (totalRequired <= widthTagsWrapper) {
			visibleCount++;
			usedWidth += requiredWidth;
		} else {
			break;
		}
	}

	const remainingCount = totalTags - visibleCount;
	return [visibleCount, remainingCount];
};