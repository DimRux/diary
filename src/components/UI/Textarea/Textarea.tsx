import React, { TextareaHTMLAttributes } from "react"

export const Textarea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ ...porps}) => {
  return <textarea name="description" id="userTask" placeholder="Описание" {...porps}></textarea>
}