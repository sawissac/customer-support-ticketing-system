import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  errorMessage?: string;
}

const LoginInput = ({ icon, errorMessage, ...props }: InputProps) => {
  return (
    <div className="icon-input">
      <div className="icon-input__inner">
        <div className="icon-input__icon">{icon}</div>
        <input {...props} />
      </div>
      {errorMessage && <div className="icon-input__error">{errorMessage}</div>}
    </div>
  );
};

export default LoginInput;
