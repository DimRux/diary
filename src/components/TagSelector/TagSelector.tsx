import { ChangeEvent, FC, SyntheticEvent, useState, useEffect } from "react";
import { clsx, saveToLocalStorage, loadFromLocalStorage, uniqId, getFilteredTags, scrollToTag } from "@utils/."
import { Icon, Input } from "@components/UI";
import tagsJson from "@data/tags.json";
import styles from "./TagSelector.module.css";

interface Tag {
  id: string;
  name: string;
}

export const TagSelector: FC = () => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<Tag[]>(tagsJson.tags.map((tag) => {
    return { id: uniqId(), ...tag};
  }));
  const [activeTags, setActiveTags] = useState<Tag[] | []>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

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
    
    const filteredTags = getFilteredTags(inputValue, activeTags, tagsJson.tags);
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
      const prevTagsName = prevActiveTags.map(({name}) => name);
      prevTagsName.push('');
      let updatedTags = [...prevActiveTags];
      if (activeIndex === -1) {
        updatedTags = prevTagsName.includes(value) ? updatedTags : [...prevActiveTags, { id: uniqId(), name: value }];
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
  <div className={styles.wrapper}>
    <Input
      placeholder="#теги"
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
              <button type="button" className={clsx(styles.tagButtonPopUp, index === activeIndex && styles.focused)} onClick={chooseTag}>
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
          <div key={id} className={styles.tagWrapper}>
            <span className={styles.tagName}>{`#${name}`}</span>
            <button className={styles.clearButton} onClick={() => handleClearTag(id)}><Icon icon="cleanText" width={12} height={12} /></button>
          </div>
        ))}
      </div>
    )}
    </div>
  );
};