import { uniqId } from "./uniqId";

export const getFilteredTags = (inputValue: string, activeTags: Array<{ name: string }>, tags: Array<{ name: string }>) => {
  const activeTagNames = activeTags.map((tag) => tag.name.toLowerCase());

  return tags
    .filter((tag) => {
      return (
            tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
            !activeTagNames.includes(tag.name.toLowerCase())
        );
    })
    .map((tag) => ({ id: uniqId(), name: tag.name }));
};