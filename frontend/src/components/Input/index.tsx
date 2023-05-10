interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }
  
  const Input = ({ label, ...props }: InputProps) => {
    return (
      <div>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />
      </div>
    );
  };
  
  export default Input;