import { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    icon?: ReactNode;
    label: string;
    type?: "button" | "submit";
    ref?: any;
  }
  
  const Button = ({ disabled, label,icon, type,ref, ...props }: ButtonProps) => {
    return (
      <button {...props} type={type} disabled={disabled} ref={ref}>
        {icon}
        {label}
      </button>
    );
  };
  export default Button;