import { SVGProps } from 'react';
import { Balloon, Edit } from "./";


interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;
}

const icons = {
  balloon: Balloon,
  edit: Edit,
} as const;

type IconName = keyof typeof icons;

const Icon = ({ icon, ...props }: IconProps) => {
  const SvgComponent = icons[icon];
  return SvgComponent ? <SvgComponent {...props} /> : null;
};

export default Icon;