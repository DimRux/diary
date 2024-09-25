import React from "react"
import { Input } from "@components/Input/Input";
import { Selector } from "@components/Selector/Selector";
import styles from './addNote.module.css';
import { Textarea } from "@components/Textarea/Textarea";
import { Image } from "@components/Image/Image";
import { Button } from "@components/UI";
import { Icon } from "@components/UI";
import { Calendar } from "@components/Calendar/Calendar";

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
              <Image width={380} height={240} />
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
