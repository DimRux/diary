import { SVGProps } from 'react';
import { Balloon, Edit, Image, CalendarSvg, Chevron, EmojiStart, Clean, CleanText } from "./";


interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;
}

const icons = {
  balloon: Balloon,
  edit: Edit,
  image: Image,
  calendar: CalendarSvg,
  chevron: Chevron,
  emoji: EmojiStart,
  clean: Clean,
  cleanText: CleanText,
} as const;

type IconName = keyof typeof icons;

export const Icon = ({ icon, ...props }: IconProps) => {
  const SvgComponent = icons[icon];
  return SvgComponent ? <SvgComponent {...props} /> : null;
};
