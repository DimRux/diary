import React, { ImgHTMLAttributes } from "react"
import Theme from '@assets/images/theme.png'

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {}

export const Image: React.FC<ImgProps> = ({ ...props }) => {
  return <img src={Theme} alt='тема' {...props}/>
}