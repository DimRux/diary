interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string,
  className?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, className, ...props}) => {
  return <input placeholder={placeholder} className={className} {...props} />
}