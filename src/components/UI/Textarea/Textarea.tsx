import React, { TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ ...porps}) => {
  return <textarea name="description" id="userTask" placeholder="Описание" {...porps}></textarea>
}