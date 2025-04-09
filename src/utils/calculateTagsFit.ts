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

	let tagsContainerWidth = widthTagsWrapper;
	let tagsCount = 0;
	let otherTags = arr.length;

	for (let i = 0; i < arr.length; i += 1) {
		const widthTag = getElementWidth(arr[i].name, styles.tag);

		const resultWidth = widthTag + (tagsCount > 0 ? GAP : 0);

		if (tagsContainerWidth >= resultWidth) {
			tagsContainerWidth -= resultWidth;
			tagsCount += 1;
			otherTags -= 1;

			// Если это первый тег, учитываем ширину для отображения оставшихся тегов
			if (i === 0 && otherTags > 0) {
				tagsContainerWidth -= getElementWidth(`+${otherTags}`, styles.tag);
			}
		} else {
			// Если первый тег не помещается, возвращаем 1 и количество оставшихся
			if (i === 0) {
				return [1, otherTags - 1];
			}
			break;
		}
	}

	return [tagsCount, otherTags];
};