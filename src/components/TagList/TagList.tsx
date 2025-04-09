import { ITag, Tag } from "@components/Tag/Tag";
import { calculateTagsFit } from "@utils/calculateTagsFit";
import { getDomElementWidth } from "@utils/getDomElementWidth";
import { FC, useState, useLayoutEffect, useRef, HTMLAttributes } from "react";
import styles from './TagList.module.css'

interface ITagList extends HTMLAttributes<HTMLDivElement> {
	tags: ITag[],
}

export const TagList: FC<ITagList> = ({ tags }) => {
	const tagsContainer = useRef<HTMLDivElement>(null);
	const [tagsView, setTagsView] = useState(0);
	const [otherTags, setOtherTags] = useState(0);
	const tagsRef = useRef(tags);
	tagsRef.current = tags;
	
  const updateTagsViewRef = useRef(() => {
		if (tagsContainer.current) {
			const widthContainer = getDomElementWidth(tagsContainer.current);
			const [view, others] = calculateTagsFit(tagsRef.current, widthContainer);
			if (view !== tagsView || others !== otherTags) {
				setTagsView(view);
				setOtherTags(others);
			}
		}
	});

	useLayoutEffect(() => {
		updateTagsViewRef.current();
	}, [tags]);

	useLayoutEffect(() => {
		const handleResize = () => {
			updateTagsViewRef.current();
		};

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
	}, []);

	return (
		<div
			ref={tagsContainer}
			className={styles.container}
		>
			{tags?.slice(0, tagsView).map(({ name }, index) => (
					<Tag className={styles.tag} name={`#${name}`} key={index} />
				))}
			{otherTags !== 0 && <Tag className={styles.tag} name={`+${otherTags}`} />}
		</div>
	);
};
