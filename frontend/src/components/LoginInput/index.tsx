import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode;
    errorMessage?: string;
  }
  
  const LoginInput = ({ icon,errorMessage, ...props }: InputProps) => {
    return (
        <div className="login_input_container">
          <div className="login_input_inner">
          <div className="icon">
            {icon}
          </div>
            <input {...props}/>
            </div>
            <span>
              {errorMessage && <span className="error">{errorMessage}</span>}
            </span>
        </div>
    );
  };
  
  export default LoginInput;