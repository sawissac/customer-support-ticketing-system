import { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    icon?: ReactNode;
    label: string;
    type?: "button" | "submit";
  }
  
  const Button = ({ disabled, label,icon, type, ...props }: ButtonProps) => {
    return (
      <button {...props} type={type} disabled={disabled}>
        {icon}
        {label}
      </button>
    );
  };
  export default Button;