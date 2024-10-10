import React from "react"
import { Textarea, Input, Button, Icon } from "@ui/."
import { Selector, Image, Calendar } from "@components/.";
import styles from './addNote.module.css';

export const AddNote: React.FC = () => {

  return (
    <main className={styles.main}>
      <form>
        <div className={styles.block}>
          <div className={styles.content}>
            <Input placeholder="Заголовок" className={styles.inputHeader} />
            <Textarea className={styles.textarea} />
          </div>
          <div className={styles.settings}>
            <div className={styles.wrapper}>
              <Calendar />
              <Selector />
            </div>
            <div className={styles.imgWrapper}>
              <Image />
              <Icon icon='image' className={styles.iconImg} />
            </div>
            <Input placeholder="#теги" className={styles.inputTag} />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button type="submit" iconName='edit' text='Создать запись' className={styles.create} background={'#FFE55E'} />
          <Button type="button" text='Отменить' className={styles.reset} background={'#E9EAEA'} />
        </div>
      </form>
    </main>
  )
};
