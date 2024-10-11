import { ChangeEvent, FC, SyntheticEvent, useState, useEffect } from "react";
import { clsx } from "@utils/clsx";
import { saveToLocalStorage, loadFromLocalStorage } from "@utils/storage";
import { Icon, Input } from "@components/UI";
import tagsJson from "@data/tags.json";
import styles from "./TagSelector.module.css";

interface Tag {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export const TagSelector: FC = () => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<Tag[] | []>(tagsJson.tags);
  const [activeTags, setActiveTags] = useState<Tag[] | []>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const storedValue = loadFromLocalStorage('inputTag');
    if (storedValue) {
      setValue(storedValue);
      setTags((prevState) => prevState.filter((tag) => {
        return tag.name.toLowerCase().includes(storedValue.toLowerCase())
      }))
    }
  
    const storedActiveTags = loadFromLocalStorage('activeTags');
    if (storedActiveTags) {
      setActiveTags(storedActiveTags);
      const storedName = storedActiveTags.map((tag: Tag) => tag.name);
      setTags((prevState) => prevState.filter((tag) => !storedName.includes(tag.name)))
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    saveToLocalStorage<string>('inputTag', inputValue);
    
    const activeTagNames = activeTags.map((tag) => tag.name.toLowerCase());
      const filteredTags = tagsJson.tags
        .filter((tag) => {
          return tag.name.toLowerCase().includes(inputValue.toLowerCase()) && 
          !activeTagNames.includes(tag.name.toLowerCase());
        });
      setTags(filteredTags);
  };

  const chooseTag = (e: SyntheticEvent<HTMLButtonElement>) => {
    const targetTagName = e.currentTarget.textContent;
    const newTags = tags.map((tag) => {
      if (targetTagName === tag.name) {
         return { ...tag, isActive: !tag.isActive }
      }
      return tag;
    });
    setTags(newTags);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const tagsActive = tags.map((tag, index) => index === activeIndex ? {...tag, isActive: true} : tag); 
      const newActiveTags = tagsActive.filter((tag) => tag.isActive);
      
      setActiveTags((prevActiveTags) => {
        const updatedTags = [...prevActiveTags, ...newActiveTags];
        saveToLocalStorage<Tag[]>('activeTags', updatedTags);
        return updatedTags; 
      });

      setValue('');
      setActiveIndex(0);

      const updatedTags = tags.map(tag => ({ ...tag, isActive: false }));
      setTags(updatedTags);
      saveToLocalStorage<Tag[]>('activeTags', activeTags);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      const newIndex = Math.max(activeIndex - 1, 0);
      const tagElement = document.querySelector(`[data-index="${newIndex}"]`);
      if (tagElement) {
        tagElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, tags.length - 1));
      const newIndex = Math.min(activeIndex + 1, tags.length - 1);
      const tagElement = document.querySelector(`[data-index="${newIndex}"]`);
      if (tagElement) {
        tagElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleClearTag = (id: number) => {
    setActiveTags((prevActiveTags) => {
      const updatedTags = prevActiveTags.filter((tag) => tag.id !== id);
      saveToLocalStorage('activeTags', JSON.stringify(updatedTags));
      return updatedTags; 
    });
  };

  const handleClearInput = () => {
    setValue('');
    saveToLocalStorage<string>('inputTag', '');
  }
  
  return (
  <div className={styles.wrapper} onKeyDown={handleKeyDown}>
    <Input
      placeholder="#теги"
      className={clsx(styles.inputTag, value && styles.search)}
      value={value}
      onChange={handleInputChange}
      
    />
    {value && <button className={styles.inputClearButton} onClick={handleClearInput}><Icon icon="cleanText" /></button>}
    {value && (
      <div className={styles.popUp}>
        <ul className={styles.tagsInPopUp} >
          <li className={styles.popUpDesc}>Нажми Enter для добавления тега</li>
          {tags.map(({ id, name, isActive }, index) => (
            <li key={id} data-index={index}>
              <button type="button" className={clsx(styles.tagButtonPopUp, isActive && styles.activeButton, index === activeIndex && styles.focused)} onClick={chooseTag}>
                {name}
              </button>
            </li>
          ))}
          {tags.length === 0 && <li className={clsx(styles.popUpDesc, styles.feedback)}>Нет совпадений по тегам, введите другой текст!</li>}
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
  )
}