import { ChangeEvent, FC, SyntheticEvent, useState, useEffect, Dispatch, SetStateAction } from "react";
import { clsx, saveToLocalStorage, loadFromLocalStorage, uniqId, getFilteredTags, scrollToTag } from "@utils/."
import { Icon, Input } from "@components/UI";
import { RootState, useAppSelector } from "@slices/index";
import styles from "./TagSelector.module.css";
import { createSelector } from "@reduxjs/toolkit";
import { useOutsideClick } from "@hooks/useOutsideClick";
import { Tag } from "@components/Tag/Tag";


export interface Tag {
  id: string;
  name: string;
}

interface TagSelectorProps {
  activeTags: Tag[],
  setActiveTags: Dispatch<SetStateAction<Tag[]>>
}
const fn1 = (state: RootState) => state.notes;

const fn = createSelector([fn1], (notes) => {
  const allTags = notes.notes.flatMap(note => note.tags);
  if (allTags.length === 0) return []; 
  
  const uniqueTagsMap = new Map(allTags.map(tag => [tag.name, tag]));
  const uniqueTags = Array.from(uniqueTagsMap.values());

  return uniqueTags; });

export const TagSelector: FC<TagSelectorProps> = ({ activeTags, setActiveTags}) => {
  const allTags = useAppSelector(fn);
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<Tag[]>(allTags || []);

  const [activeIndex, setActiveIndex] = useState(-1);

  const ref = useOutsideClick<HTMLDivElement>(() => setValue(''));

  const effectUpdateTagsOnInput = (inputValue: string) => {
    setTags((prevState) => 
      prevState.filter((tag) => 
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };
  
  const effectUpdateTagsOnActiveTags = (activeTags: Tag[]) => {
    const activeTagNames = activeTags.map((tag) => tag.name);
    setTags((prevState) => prevState.filter((tag) => !activeTagNames.includes(tag.name))
    );
  };

  useEffect(() => {
    const storedValue = loadFromLocalStorage('inputTag');
    if (storedValue) {
      setValue(storedValue);
      effectUpdateTagsOnInput(storedValue);
    }
  
    const storedActiveTags = loadFromLocalStorage('activeTags');
    if (storedActiveTags && storedActiveTags.length > 0) {
      setActiveTags(storedActiveTags);
      effectUpdateTagsOnActiveTags(storedActiveTags);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    saveToLocalStorage<string>('inputTag', inputValue);
    setActiveIndex(-1);
    
    const filteredTags = getFilteredTags(inputValue, activeTags, allTags);
    setTags(filteredTags);
  };

  const chooseTag = (e: SyntheticEvent<HTMLButtonElement>) => {
    const targetTagName = e.currentTarget.textContent;
    if (targetTagName) {
      setActiveTags(prevState => {
        const updatedTags = [...prevState, { id: uniqId(), name: targetTagName }];
        saveToLocalStorage<Tag[]>('activeTags', updatedTags);
        return updatedTags;
      });
      setValue('');
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    e.preventDefault();
    setActiveTags((prevActiveTags) => {
      const prevTagsName = prevActiveTags.map(({name}) => name.toLowerCase());
      prevTagsName.push('');
      let updatedTags = [...prevActiveTags];
      if (activeIndex === -1) {
        updatedTags = prevTagsName.includes(value.toLowerCase()) ? updatedTags : [...prevActiveTags, { id: uniqId(), name: value }];
      } else {
        updatedTags = [...prevActiveTags, tags[activeIndex]];
      }
      saveToLocalStorage<Tag[]>('activeTags', updatedTags);
      return updatedTags; 
    });
  
    setValue('');
    setActiveIndex(-1);
    saveToLocalStorage<string>('inputTag', '');
  };
  
  const handleArrowUpKey = (e: React.KeyboardEvent) => {
    e.preventDefault();
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex - 1 < -1 ? tags.length - 1 : prevIndex - 1;
      scrollToTag(newIndex);
      return newIndex;
    });
  };
  
  const handleArrowDownKey = (e: React.KeyboardEvent) => {
    e.preventDefault();
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex + 1 > tags.length - 1 ? -1 : prevIndex + 1;
      scrollToTag(newIndex);
      return newIndex;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleEnterKey(e);
        break;
      case 'ArrowUp':
        handleArrowUpKey(e);
        break;
      case 'ArrowDown':
        handleArrowDownKey(e);
        break;
      default:
        break;
    }
  };

  const handleClearTag = (id: string) => {
    setActiveTags((prevActiveTags) => {
      const updatedTags = prevActiveTags.filter((tag) => tag.id !== id);
      saveToLocalStorage('activeTags', updatedTags);
      return updatedTags; 
    });
  };

  const handleClearInput = () => {
    setValue('');
    setActiveIndex(-1);
    saveToLocalStorage<string>('inputTag', '');
  }
  
  return (
  <div className={styles.wrapper} ref={ref}>
    <Input
      placeholder="#теги"
      aria-label="Перейти к вводу тега"
      className={clsx(styles.inputTag, value && styles.search)}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
    {value && <button className={styles.inputClearButton} onClick={handleClearInput}><Icon icon="cleanText" /></button>}
    {value && (
      <div className={styles.popUp}>
        <ul className={styles.tagsInPopUp} >
          <li className={styles.popUpDesc}>Нажми Enter для добавления тега</li>
          {tags.map(({ id, name }, index) => (
            <li key={id} data-index={index}>
              <button type="button" className={clsx(styles.tagButtonPopUp, index === activeIndex && styles.focused)} onClick={chooseTag} aria-label="Выбрать тег из выпадающего списка">
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
    {activeTags.length > 0 && (
      <div className={styles.tagsContainer}>
        {activeTags.map(({id, name}) => (
          <Tag name={`#${name}`} key={id}> 
            <button className={styles.clearButton} onClick={() => handleClearTag(id)} aria-label="Удалить выбранный тег"><Icon icon="cleanText" width={12} height={12} /></button>
          </Tag>
        ))}
      </div>
    )}
    </div>
  );
};