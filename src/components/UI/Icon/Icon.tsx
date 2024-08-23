import { SVGProps } from 'react';
import { Balloon, Edit } from "./";

type IconName = 'balloon' | 'edit';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;
}

const icons: { [key in IconName]: React.FC<SVGProps<SVGSVGElement>> } = {
  balloon: Balloon,
  edit: Edit,
};

const Icon = ({ icon, ...props }: IconProps) => {
  const SvgComponent = icons[icon];
  return SvgComponent ? <SvgComponent {...props} /> : null;
};

export default Icon;